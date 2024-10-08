"use client";

import Cookies from "js-cookie";
import Button from "~/components/Button";

export default function TempLogin() {
	return (
		<div className="grid p-6 gap-6">
			<h1 className="text-lg font-semibold">Temporary Token Page</h1>
			<p>Looks like you're on a cloudflare deploy preview.</p>
			<p>
				Comma currently doesn't have any public auth system yet, so it's not
				possible to directly log in on cloudflare yet.
			</p>
			<Button variant="secondary" href="https://jwt.comma.ai">
				Get a token from comma
			</Button>
			<label className="grid gap-6">
				paste your JWT token here
				<input
					type="text"
					name="code"
					className="p-6 border"
					onChange={(e) => Cookies.set("comma_token", e.target.value.trim())}
				/>
			</label>
			<Button href="/">Login</Button>
		</div>
	);
}
