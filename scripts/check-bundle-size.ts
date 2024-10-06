/**
 * Run a build, then calculate the total size for all pages and assets
 */

import { $, Glob } from "bun";

const buildOutput = $`bun run build --no-lint`.lines();
const extractSizeRegex = /([.\d]+) ([kbmg]?B)/;
let isFinished = false;
let sizeInBytes = 0;

// get the JS size for each page
for await (const line of buildOutput) {
	// wait for build to finish
	if (line.includes("First Load JS")) isFinished = true;
	if (!isFinished) continue;

	const included = line.includes("/") && !line.includes("chunks");
	const shared = line.includes("shared by all");
	if (!included && !shared) continue;

	// the first size listed is the one we want (for pages, that will exclude the shared chunk - we count it separately)
	const [count, unit] = extractSizeRegex.exec(line)?.slice(1) ?? [];
	if (!count || !unit) continue;

	if (unit === "B") sizeInBytes += Number.parseInt(count);
	else if (unit === "kB") sizeInBytes += Number.parseInt(count) * 1024;
	else if (unit === "MB") sizeInBytes += Number.parseInt(count) * 1024 * 1024;
	else if (unit === "GB")
		sizeInBytes += Number.parseInt(count) * 1024 * 1024 * 1024;
	else throw new Error(`Unknown unit ${unit}`);
}

// also measure the gzipped size of every asset in the build.
const allAssets = await new Glob("**/*.{css,svg,png,jpeg,jpg,webp}");
for await (const file of allAssets.scan(".next/static")) {
	const size = await $`gzip -c .next/static/${file} | wc -c`.text();
	sizeInBytes += Number.parseInt(size);
}
// worth noting it doesn't really make sense to include the public folder in the size -
// but that's how the comma repo does it, so we'll do the same for the sake of comparison where possible
for await (const file of allAssets.scan("public")) {
	if (file.startsWith("pwa")) continue; // skip pwa assets, since they're not part of the load
	const size = await $`gzip -c public/${file} | wc -c`.text();
	sizeInBytes += Number.parseInt(size);
}

const sizeInKB = sizeInBytes / 1024;
console.log(`Bundle size is ${Math.round(sizeInKB)} KB`);

// check if the bundle size is within the expected range
if (sizeInKB < 200) {
	console.log("Bundle size lower than expected, let's lower the limit!");
	process.exit(0); // TODO - this should be a non-zero exit code
}

if (sizeInKB > 325) {
	console.log("Exceeded bundle size limit!");
	process.exit(1);
}
