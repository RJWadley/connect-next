"use client";
import { useRef } from "react";
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
	const sidebarRef = useRef<HTMLDivElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);

	const openSidebar = () => {
		if (!wrapperRef.current) return;

		// this is processed before our click event, so we can always scroll to open
		const { scrollWidth, offsetWidth } = wrapperRef.current;
		wrapperRef.current.scrollTo({
			left: offsetWidth - scrollWidth,
			behavior: "smooth",
		});
	};

	// if the click is outside the sidebar, close it
	// a click on the menu button will also trigger this
	useEventListener("click", (e) => {
		if (
			wrapperRef.current &&
			wrapperRef.current.scrollLeft < 0 &&
			e.target instanceof Element &&
			!sidebarRef.current?.contains(e.target)
		) {
			wrapperRef.current?.scrollTo({
				left: 0,
				behavior: "smooth",
			});
		}
	});

	return (
		<div
			// rtl lets the sidebar default to closed
			className="w-dvw h-dvh overflow-x-auto flex snap-x snap-mandatory rtl no-scrollbar"
			ref={wrapperRef}
		>
			<div className="w-screen shrink-0 snap-start overflow-y-scroll md:w-full md:shrink">
				<div className="p-6 flex border-b w-full items-center gap-5">
					<button
						type="button"
						onClick={openSidebar}
						aria-label="Toggle sidebar"
						className="size-6 flex flex-col justify-around items-center md:hidden"
					>
						<div className="h-px w-5 bg-white" />
						<div className="h-px w-5 bg-white" />
						<div className="h-px w-5 bg-white" />
					</button>
					<div className="text-xl font-extrabold capsize">COMMA CONNECT</div>
				</div>
				<div>{children}</div>
			</div>
			<div
				className="border-r w-[80vw] shrink-0 h-full overflow-y-scroll snap-start md:w-auto"
				ref={sidebarRef}
			>
				{sidebar}
			</div>
		</div>
	);
}
