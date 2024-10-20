import { z } from "zod";
import { getAccessToken } from "./auth/tokens";
import { BASE_URL } from "./config";

const statsSchema = z.object({
	all: z.object({
		distance: z.number(),
		minutes: z.number(),
		routes: z.number(),
	}),
	week: z.object({
		distance: z.number(),
		minutes: z.number(),
		routes: z.number(),
	}),
});

export const getDeviceStats = async (dongleId: string) => {
	const response = await fetch(`${BASE_URL}/v1.1/devices/${dongleId}/stats`, {
		headers: {
			Authorization: `JWT ${await getAccessToken()}`,
		},
	}).then((res) => res.json());

	return statsSchema.parse(response);
};
