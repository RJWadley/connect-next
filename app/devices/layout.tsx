import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { getAccessToken } from "~/(api)/auth/tokens";
import { getDevices } from "~/(api)/devices";
import { getProfile } from "~/(api)/profile";
import Button from "~/components/Button";
import HeaderSidebar from "~/components/HeaderSidebar";
import { WhoAmI } from "~/components/WhoAmI";
import DeviceList from "./DeviceList";

export const runtime = "edge";

export default async function DeviceLayout({
	children,
}: { children: React.ReactNode }) {
	const token = await getAccessToken();
	if (!token) redirect("/login");

	const client = new QueryClient();

	// prefetch any queries we'll need on this page
	const a = client.prefetchQuery({
		queryKey: ["getDevices"],
		queryFn: getDevices,
	});
	const b = client.prefetchQuery({
		queryKey: ["getProfile"],
		queryFn: getProfile,
	});

	await Promise.all([a, b]);

	return (
		<HydrationBoundary state={dehydrate(client)}>
			<HeaderSidebar
				sidebar={
					<>
						<WhoAmI />
						<DeviceList />
						<Button variant="secondary" href="/auth/logout">
							Sign Out
						</Button>
					</>
				}
			>
				{children}
			</HeaderSidebar>
		</HydrationBoundary>
	);
}
