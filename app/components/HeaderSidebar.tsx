"use client";

import clsx from "clsx";
import { startTransition, useRef, useState } from "react";
import { useEventListener } from "~/utils/useEventListener";

/**
 * the main view of comma connect is:
 * sidebar header
 * sidebar map
 * sidebar drive list
 *
 * this component contains header code + layout logic for the sidebar
 */
export default function HeaderSidebar({
	children,
	sidebar,
}: {
	children: React.ReactNode;
	sidebar: React.ReactNode;
}) {
	const [open, setOpen] = useState(false);
	const sidebarRef = useRef<HTMLDivElement>(null);

	// if the click is outside the sidebar, close it
	useEventListener("click", (e) => {
		if (
			open &&
			e.target instanceof Element &&
			!sidebarRef.current?.contains(e.target)
		)
			setOpen(false);
	});

	return (
		<div className="w-full overflow-x-clip">
			<div
				className={clsx(
					"flex w-[180vw] transition-transform duration-300 md:w-full",
					!open && "translate-x-[-80vw] md:translate-x-0",
				)}
			>
				<div
					className="shrink-0 border-r w-[80vw] h-dvh overflow-y-scroll md:w-auto"
					ref={sidebarRef}
				>
					{sidebar}
				</div>
				<div
					className={clsx(
						"transition-transform duration-300 border m-[-1px]",
						open &&
							"scale-95 translate-x-6 opacity-90 md:scale-100 md:translate-x-0 md:opacity-100",
					)}
				>
					<div className="p-6 flex border-b w-screen">
						<button
							type="button"
							onClick={() => startTransition(() => setOpen(!open))}
							aria-label="Toggle sidebar"
							className="size-6 flex flex-col justify-around items-center md:hidden"
						>
							<div className="h-px w-5 bg-white" />
							<div className="h-px w-5 bg-white" />
							<div className="h-px w-5 bg-white" />
						</button>
					</div>
					<div>{children}</div>
				</div>
			</div>
		</div>
	);
}
