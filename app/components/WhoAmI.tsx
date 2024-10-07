"use client";

import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../(api)/account";

export function WhoAmI() {
	const { data: me } = useQuery({
		queryKey: ["getMe"],
		queryFn: getProfile,
	});

	return (
		<pre>
			profile:
			<br />
			{JSON.stringify(me, null, 2)}
		</pre>
	);
}
