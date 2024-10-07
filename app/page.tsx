import { cookies } from "next/headers";

export const runtime = "edge";

export default function Home() {
	const token = cookies().get("comma_token")?.value;

	if (token) {
		return (
			<div>
				<p>You are logged in!</p>
				<p>Your access token is: {token}</p>
				<a href="/auth/logout">Sign out</a>
			</div>
		);
	}

	return (
		<div>
			<p>You are not logged in!</p>
			<a href="/auth/login">Sign in</a>
		</div>
	);
}
