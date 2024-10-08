"use client";

import { useQuery } from "@tanstack/react-query";
import { getDevices } from "~/(api)/devices";
import Button from "~/components/Button";

export default function DeviceList() {
	const { data, error, isLoading } = useQuery({
		queryKey: ["getDevices"],
		queryFn: getDevices,
		// keep online devices up to date
		refetchInterval: 1000 * 60 * 2,
	});

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;
	// TODO - device pairing
	if (data?.length === 0)
		return (
			<div>
				<h1>You don't have any devices</h1>
				<Button>Pair a device</Button>
			</div>
		);

	return (
		<div>
			{data?.map((device) => (
				<Button key={device.dongle_id} href={`/devices/${device.dongle_id}`}>
					<p>{device.is_online ? "Online" : "Offline"}</p>
					<h2>{device.alias || `comma ${device.device_type}`}</h2>
					<p>{device.dongle_id}</p>
				</Button>
			))}
		</div>
	);
}
