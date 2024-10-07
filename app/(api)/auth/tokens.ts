import Cookies from "js-cookie";
import { z } from "zod";
import { BASE_URL } from "../config";
const headers = typeof window === "undefined" ? import("next/headers") : null;

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

export const getAccessToken = async () => {
	if (headers) {
		const { cookies } = await headers;
		return cookies().get("comma_token")?.value;
	}
	return Cookies.get("comma_token");
};
