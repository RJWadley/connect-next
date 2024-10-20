import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";
import { execSync } from "node:child_process";

// Here we use the @cloudflare/next-on-pages next-dev module to allow us to use bindings during local development
// (when running the application with `next dev`), for more information see:
// https://github.com/cloudflare/next-on-pages/blob/main/internal-packages/next-dev/README.md
if (process.env.NODE_ENV === "development") {
	await setupDevPlatform();
}

/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		NEXT_PUBLIC_GIT_SHA: execSync("git rev-parse --short HEAD")
			.toString()
			.trim(),
		NEXT_PUBLIC_GIT_REMOTE: execSync("git remote get-url origin")
			.toString()
			.trim()
			.replace(".git", ""),
		NEXT_PUBLIC_GIT_DATE: new Date(
			execSync("git log -1 --format=%ct").toString().trim() * 1000,
		).toISOString(),
	},
};

export default nextConfig;
