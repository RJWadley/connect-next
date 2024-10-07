import { z } from "zod";
import { BASE_URL } from "./config";

const schema = z.object({
	access_token: z.string(),
});

export async function createAccessToken(code: string, provider: string) {
	const resp = await fetch(`${BASE_URL}/v2/auth`, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams({ code, provider }),
	});

	if (!resp.ok) {
		throw new Error(`${resp.status}: ${await resp.text()}`);
	}

	const json = schema.parse(await resp.json());

	return json.access_token;
}
