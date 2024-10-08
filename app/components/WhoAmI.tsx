"use client";

import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../(api)/profile";

export function WhoAmI() {
	const { data, isLoading, error } = useQuery({
		queryKey: ["getProfile"],
		queryFn: getProfile,
	});

	if (isLoading) return <div>Loading your profile</div>;
	if (error) return <div>Error loading your profile</div>;
	if (!data) return <div>No profile found</div>;

	return (
		<div className="p-6">
			You are logged in as
			<br />
			<br />
			<code>{data.email}</code>
		</div>
	);
}
