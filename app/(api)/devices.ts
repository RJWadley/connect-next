import { z } from "zod";
import { getAccessToken } from "./auth/tokens";
import { BASE_URL } from "./config";

// strict object until i'm certain this is the correct schema
const deviceSchema = z.strictObject({
	alias: z.string().nullable(),
	athena_host: z.string().nullable(),
	device_type: z.string(),
	dongle_id: z.string(),
	eligible_features: z.strictObject({
		nav: z.boolean(),
		prime: z.boolean(),
		prime_data: z.boolean(),
	}),
	ignore_uploads: z.boolean().nullable(),
	is_owner: z.boolean(),
	is_paired: z.boolean(),
	last_athena_ping: z.number().nullable(),
	last_gps_accuracy: z.number().nullable(),
	last_gps_bearing: z.number().nullable(),
	last_gps_lat: z.number().nullable(),
	last_gps_lng: z.number().nullable(),
	last_gps_speed: z.number().nullable(),
	last_gps_time: z.number().nullable(),
	openpilot_version: z.string().nullable(),
	prime: z.boolean(),
	prime_type: z.number(),
	serial: z.string(),
	sim_id: z.string(),
	sim_type: z.number(),
	trial_claimed: z.boolean(),
	public_key: z.string(),
});

const devicesSchema = z.array(deviceSchema);

export type Device = z.infer<typeof deviceSchema> & {
	is_online: boolean;
};

const isDeviceOnline = (fetchedAt: number, lastPing: number | null) =>
	lastPing // this could be null or 0
		? Date.now() -
				fetchedAt -
				// last ping is in seconds
				lastPing * 1000 <
			2 * 60 * 1000
		: false;

const sortDevices = (devices: Device[]) =>
	devices.sort((a, b) => {
		if (a.is_owner !== b.is_owner) {
			return a.is_owner ? -1 : 1;
		}
		if (a.alias && b.alias) {
			return a.alias.localeCompare(b.alias);
		}
		if (!a.alias && !b.alias) {
			return a.dongle_id.localeCompare(b.dongle_id);
		}
		return a.alias ? -1 : 1;
	});

export const getDevice = async (dongleId: string) => {
	const response = await fetch(`${BASE_URL}/v1.1/devices/${dongleId}/`, {
		headers: {
			Authorization: `JWT ${await getAccessToken()}`,
		},
	}).then((res) => res.json());

	return deviceSchema.parse(response);
};

export const getDevices = async () => {
	const fetchedAt = Date.now();
	const response = await fetch(`${BASE_URL}/v1/me/devices/`, {
		headers: {
			Authorization: `JWT ${await getAccessToken()}`,
		},
	}).then((res) => res.json());

	const devices = devicesSchema.parse(response);

	return sortDevices(
		devices.map((device) => ({
			...device,
			// device is online if the last ping was less than 2 minutes ago
			is_online: isDeviceOnline(fetchedAt, device.last_athena_ping),
		})),
	);
};
