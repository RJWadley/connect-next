import { redirect } from "next/navigation";
import { getDevices } from "~/(api)/devices";

export default async function Devices() {
	const [defaultDevice] = await getDevices();

	if (defaultDevice) redirect(`/devices/${defaultDevice.dongle_id}`);

	return <div className="p-6">You have no devices</div>;
}
