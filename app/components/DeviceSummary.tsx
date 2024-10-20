"use client";

import { useQuery } from "@tanstack/react-query";
import { getDevice } from "~/(api)/devices";
import { getDeviceStats } from "~/(api)/stats";

export function DeviceSummary({ dongleId }: { dongleId: string }) {
	const {
		data: stats,
		isLoading: loadingStats,
		error: statsError,
	} = useQuery({
		queryKey: ["getDeviceStats", dongleId],
		queryFn: () => getDeviceStats(dongleId),
	});

	const {
		data: device,
		isLoading: loadingDevice,
		error: deviceError,
	} = useQuery({
		queryKey: ["getDevice", dongleId],
		queryFn: () => getDevice(dongleId),
	});

	if (loadingDevice || loadingStats) return <div>Loading...</div>;
	if (deviceError) return <div>Error: {deviceError.message}</div>;
	if (statsError) return <div>Error: {statsError.message}</div>;
	if (!stats || !device) return <div>Error: no device found</div>;

	return (
		<div className="p-6">
			<h1>Device Summary for {device.alias || device.dongle_id}</h1>
			<br />
			This week:
			<br />
			Miles: {stats.week.distance.toFixed(2)}
			<br />
			Minutes: {stats.week.minutes}
			<br />
			Routes: {stats.week.routes}
			<br />
			<br />
			All time:
			<br />
			Miles: {stats.all.distance.toFixed(2)}
			<br />
			Minutes: {stats.all.minutes}
			<br />
			Routes: {stats.all.routes}
		</div>
	);
}
