import {
	getAppleAuthUrl,
	getGitHubAuthUrl,
	getGoogleAuthUrl,
} from "../authUrls";

export default function Login() {
	return (
		<div className="flex flex-col gap-1">
			<a href={getGoogleAuthUrl()}>Sign in with Google</a>
			<a href={getAppleAuthUrl()}>Sign in with Apple</a>
			<a href={getGitHubAuthUrl()}>Sign in with GitHub</a>
			<a href="/auth/demo">Try the demo</a>
		</div>
	);
}
