"use client";

import { useQuery } from "@tanstack/react-query";
import { getRoutes } from "~/(api)/segments";

const getStateColor = (state: string) => {
	switch (state) {
		case "enabled":
			return "#178645";
		case "overriding":
			return "#919b95";
		case "preEnabled":
			return "#919b95";
		case "disabled":
			return "#175886";
		case "softDisabling":
			return "#da6f25";
		default:
			return "#175886";
	}
};

const getGradient = (
	states: {
		percent: number;
		state:
			| "enabled"
			| "disabled"
			| "preEnabled"
			| "softDisabling"
			| "overriding";
	}[],
) => {
	const [firstState] = states;
	if (!firstState) return [{ width: 100, color: "red", key: 0 }];
	if (states.length === 1)
		return [{ width: 100, color: getStateColor(firstState.state), key: 0 }];

	return states.map((state, index, all) => {
		const next = all[index + 1];
		const previous = all[index - 1];

		// last state
		if (!next)
			return {
				width: 100 - state.percent,
				color: getStateColor(state.state),
				key: state.percent,
			};

		// first state
		if (!previous)
			return {
				width: next.percent,
				color: getStateColor(state.state),
				key: state.percent,
			};

		return {
			width: next.percent - state.percent,
			color: getStateColor(state.state),
			key: state.percent,
		};
	});
};

export function RouteList({ deviceId }: { deviceId: string }) {
	const { data, isLoading, error } = useQuery({
		queryKey: ["getRoutes", deviceId],
		queryFn: () => getRoutes(deviceId),
	});

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;
	if (!data) return <div>No routes found</div>;

	return (
		<div className="p-6">
			{data.map((r) => (
				<div key={r.fullname}>
					total time: {r.end_time_utc_millis - r.start_time_utc_millis}
					<br />
					start: {r.start_time_utc_millis}
					<br />
					percent engaged: {r.engagedPercent.toFixed(1)}%
					<div className="h-2.5 flex">
						{getGradient(r.stateChanges).map((bar) => (
							<div
								key={bar.key}
								style={{
									background: bar.color,
									width: `${bar.width}%`,
								}}
							/>
						))}
					</div>
					<br />
					<br />
					<br />
					<br />
				</div>
			))}
		</div>
	);
}
