import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from "@tanstack/react-query";
import { getDevice } from "~/(api)/devices";
import { getRoutes } from "~/(api)/segments";
import { getDeviceStats } from "~/(api)/stats";
import { DeviceSummary } from "~/components/DeviceSummary";
import { RouteList } from "~/components/RouteList";

export default async function DevicePage({
	params: { deviceId },
}: { params: { deviceId: string } }) {
	const client = new QueryClient();

	// prefetch any queries we'll need on this page
	await Promise.all([
		client.prefetchQuery({
			queryKey: ["getDeviceStats", deviceId],
			queryFn: () => getDeviceStats(deviceId),
		}),
		client.prefetchQuery({
			queryKey: ["getRoutes", deviceId],
			queryFn: () => getRoutes(deviceId),
		}),
		client.prefetchQuery({
			queryKey: ["getDevice", deviceId],
			queryFn: () => getDevice(deviceId),
		}),
	]);

	return (
		<HydrationBoundary state={dehydrate(client)}>
			<DeviceSummary dongleId={deviceId} />
			<RouteList deviceId={deviceId} />
		</HydrationBoundary>
	);
}
