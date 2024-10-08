import { redirect } from "next/navigation";
import { getAccessToken } from "./(api)/auth/tokens";

export const runtime = "edge";

export default async function Home() {
	const accessToken = await getAccessToken();

	if (accessToken) redirect("/devices");

	// we don't seem to be logged in
	redirect("/auth/login");
}
