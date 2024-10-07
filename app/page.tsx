import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from "@tanstack/react-query";
import { getAccessToken } from "./(api)/auth/tokens";
import { getProfile } from "./(api)/profile";
import { WhoAmI } from "./components/WhoAmI";

export const runtime = "edge";

export default async function Home() {
	// if we're logged in, prefetch data we need on every page
	const queryClient = new QueryClient();
	const accessToken = await getAccessToken();
	if (accessToken) {
		await queryClient.prefetchQuery({
			queryKey: ["getMe"],
			queryFn: getProfile,
		});
	}

	if (accessToken) {
		return (
			<HydrationBoundary state={dehydrate(queryClient)}>
				<div>
					<p>You are logged in!</p>
					<WhoAmI />
					<a href="/auth/logout">Sign out</a>
				</div>
			</HydrationBoundary>
		);
	}

	return (
		<div>
			<p>You are not logged in!</p>
			<a href="/auth/login">Sign in</a>
		</div>
	);
}
