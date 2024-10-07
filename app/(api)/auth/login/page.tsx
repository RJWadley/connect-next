import Image from "next/image";
import { redirect } from "next/navigation";
import Button from "~/components/Button";
import {
	getAppleAuthUrl,
	getGitHubAuthUrl,
	getGoogleAuthUrl,
} from "../authUrls";
import { getAccessToken } from "../tokens";
import AppleLogo from "./logo-apple.svg";
import GitHubLogo from "./logo-github.svg";
import GoogleLogo from "./logo-google.svg";

export const runtime = "edge";

export default async function Login() {
	const accessToken = await getAccessToken();
	if (accessToken) redirect("/");

	return (
		<div className="flex flex-col gap-2 px-3 py-24 max-w-md mx-auto">
			<Image
				src="/icon-light.svg"
				alt="comma logo"
				width="100"
				height="100"
				className="size-32 mx-auto hidden dark:block"
			/>
			<Image
				src="/icon-dark.svg"
				alt="comma logo"
				width="100"
				height="100"
				className="size-32 mx-auto dark:hidden"
			/>
			<h1 className="text-center text-4xl font-extrabold capsize mt-7 mb-2">
				Comma Connect
			</h1>
			<h2 className="text-center text-lg font-medium capsize mb-7 opacity-80 text-balance">
				Manage your comma device, view your drives, and use comma prime features
			</h2>
			<Button
				href={getGoogleAuthUrl()}
				icon={<Image className="size-6" src={GoogleLogo} alt="Google logo" />}
			>
				Sign in with Google
			</Button>
			<Button
				href={getAppleAuthUrl()}
				icon={
					<Image
						className="size-6 dark:invert"
						src={AppleLogo}
						alt="Apple logo"
					/>
				}
			>
				Sign in with Apple
			</Button>
			<Button
				href={getGitHubAuthUrl()}
				icon={
					<Image
						className="size-6 dark:invert"
						src={GitHubLogo}
						alt="GitHub logo"
					/>
				}
			>
				Sign in with GitHub
			</Button>
			<Button variant="secondary" href="/auth/demo">
				Try the demo
			</Button>
		</div>
	);
}
