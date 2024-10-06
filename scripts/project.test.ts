import { expect, test } from "bun:test";
import { $ } from "bun";
import project from "../package.json" assert { type: "json" };

/**
 * all dependencies should be documented
 * and no non-dependencies should be documented
 */
const deps: Record<string, string> = {
	...project.dependencies,
	...project.devDependencies,
};
const depDocs: Record<string, string> = {
	...project["//dependencies"],
	...project["//devDependencies"],
};

for (const dep of Object.keys(depDocs)) {
	test(`${dep} shouldn't be documented unnecessarily`, () => {
		expect(deps[dep]).toBeTruthy();
	});
}
for (const dep of Object.keys(deps)) {
	test(`dependency ${dep} should be documented`, () => {
		expect(depDocs[dep]).toBeTruthy();
	});
}
