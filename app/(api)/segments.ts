import { getAccessToken } from "./auth/tokens";
import { BASE_URL } from "./config";
import { z } from "zod";

export const eventSchema = z.array(
	z.union([
		z.object({
			type: z.literal("event"),
			time: z.number(),
			offset_millis: z.number(),
			route_offset_millis: z.number(),
			data: z.object({
				event_type: z.enum(["record_front_toggle", "first_road_camera_frame"]),
				value: z.boolean().optional(),
			}),
		}),
		z.object({
			type: z.literal("state"),
			time: z.number(),
			offset_millis: z.number(),
			route_offset_millis: z.number(),
			data: z.object({
				state: z.enum([
					"disabled",
					"preEnabled",
					"enabled",
					"softDisabling",
					"overriding",
				]),
				enabled: z.boolean(),
				alertStatus: z.number(),
			}),
		}),
	]),
);

const routesResponseSchema = z.array(
	z.strictObject({
		can: z.boolean(),
		create_time: z.number(),
		devicetype: z.number(),
		dongle_id: z.string(),
		end_lat: z.number(),
		end_lng: z.number(),
		end_time: z.string(),
		end_time_utc_millis: z.number(),
		fullname: z.string(),
		git_branch: z.string(),
		git_commit: z.string(),
		git_dirty: z.boolean(),
		git_remote: z.string(),
		hpgps: z.boolean(),
		init_logmonotime: z.number(),
		is_preserved: z.boolean(),
		is_public: z.boolean(),
		length: z.number(),
		maxcamera: z.number(),
		maxdcamera: z.number(),
		maxecamera: z.number(),
		maxlog: z.number(),
		maxqcamera: z.number(),
		maxqlog: z.number(),
		passive: z.boolean(),
		platform: z.string().nullable(),
		proccamera: z.number(),
		proclog: z.number(),
		procqcamera: z.number(),
		procqlog: z.number(),
		radar: z.boolean(),
		rating: z.unknown(),
		segment_end_times: z.array(z.number()),
		segment_numbers: z.array(z.number()),
		segment_start_times: z.array(z.number()),
		share_exp: z.string(),
		share_sig: z.string(),
		start_lat: z.number(),
		start_lng: z.number(),
		start_time: z.string(),
		start_time_utc_millis: z.number(),
		url: z.string(),
		user_id: z.string().nullable(),
		version: z.string(),
		vin: z.string().nullable(),
	}),
);

const roundToNearest = (num: number, nearest: number) =>
	Math.round(num * nearest) / nearest;

// TODO - this api is SLOW and uses a large number of fetches
// everything in here never changes and should be pre-computed on api side
const getEnrichedRouteData = async (
	route: z.infer<typeof routesResponseSchema>[number],
) => {
	const eventsRequest = route.segment_numbers.map((segmentNumber) =>
		fetch(`${route.url}/${segmentNumber}/events.json`)
			.then((r) => r.json())
			.then((r) => eventSchema.parse(r)),
	);

	const startTime = route.start_time_utc_millis;
	const endTime = route.end_time_utc_millis;
	const events = (await Promise.all(eventsRequest)).flat().map((event) => ({
		...event,
		// note: time from the event is in nanoseconds since... something...
		// much easier to just do the math to get milliseconds
		time: startTime + event.route_offset_millis,
	}));

	const stateChanges = events
		.filter((s) => s.type === "state")
		.map((s) => ({
			percent: roundToNearest(
				((s.time - startTime) / (endTime - startTime)) * 100,
				// at a certain point, small differences are imperceptible and just take up characters
				2,
			),
			state: s.data.state,
		}))
		// filter out duplicate states - only keep the earliest
		// filter in two stages - first duplicate percents (~ same time), then duplicate states
		// if we tried to do this all at once, they'd interfere
		.filter((state, index, all) => {
			const prev = all[index - 1];
			return prev?.percent !== state.percent;
		})
		.filter((state, index, all) => {
			const prev = all[index - 1];
			return prev?.state !== state.state;
		});

	let engagedTime = 0;
	let enabledAt: false | number = false;

	// sum the deltas between each enabled and disabled state
	for (let i = 0; i < events.length - 1; i++) {
		const current = events[i];
		if (!current) continue;
		if (current.type !== "state") continue;

		if (
			// enabled and not overridden
			current.data.enabled &&
			current.data.state !== "overriding" &&
			current.data.state !== "preEnabled"
		) {
			enabledAt ||= current.time; // sets time if not set yet
		} else if (enabledAt !== false) {
			engagedTime += current.time - enabledAt;
			enabledAt = false;
		}
	}

	return {
		stateChanges,
		engagedTime,
		engagedPercent: (engagedTime / (endTime - startTime)) * 100,
	};
};

export const getRoutes = async (dongleId: string, before?: number) => {
	const params = new URLSearchParams();
	params.set("limit", "20");
	if (before) params.set("end", Math.round(Date.now() / 1000).toString());

	const routes = await fetch(
		`${BASE_URL}/v1/devices/${dongleId}/routes_segments?${params}`,
		{
			headers: {
				Authorization: `JWT ${await getAccessToken()}`,
			},
		},
	)
		.then((r) => r.json())
		.then((r) => routesResponseSchema.parse(r));

	const augmented = routes.map(async (route) => {
		const enriched = await getEnrichedRouteData(route);
		return {
			...route,
			...enriched,
		};
	});

	return await Promise.all(augmented);
};
