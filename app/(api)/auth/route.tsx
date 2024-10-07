import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { createAccessToken } from "./tokens";

export const runtime = "edge";

export async function GET(request: NextRequest) {
	const code = request.nextUrl.searchParams.get("code");
	const provider = request.nextUrl.searchParams.get("provider");

	if (!code || !provider) {
		return new Response("missing code or provider", { status: 400 });
	}

	const token = await createAccessToken(code, provider);
	cookies().set("comma_token", token, { path: "/" });

	redirect("/");
}
