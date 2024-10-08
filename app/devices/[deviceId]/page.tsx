export default function DevicePage({
	params: { deviceId },
}: { params: { deviceId: string } }) {
	return <div className="p-6">device page for {deviceId}</div>;
}
