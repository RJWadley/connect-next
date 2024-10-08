import { z } from "zod";
import { getAccessToken } from "./auth/tokens";
import { BASE_URL } from "./config";

const profileSchema = z.object({
	email: z.string(),
	id: z.string(),
	prime: z.boolean(),
	superuser: z.boolean(),
});

export const getProfile = async () => {
	const response = await fetch(`${BASE_URL}/v1/me/`, {
		headers: {
			Authorization: `JWT ${await getAccessToken()}`,
		},
	}).then((res) => res.json());

	return profileSchema.parse(response);
};
