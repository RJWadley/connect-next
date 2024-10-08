import clsx from "clsx";

const variants = {
	accent: "bg-green-400 text-black border-black hover:bg-green-500",
	primary:
		"bg-black text-white border-white dark:bg-white dark:text-black dark:border-black hover:bg-gray-900 dark:hover:bg-gray-100",
	secondary:
		"bg-white text-black dark:bg-black dark:text-white outline outline-1 hover:bg-gray-100 dark:hover:bg-gray-900",
};

export default function Button({
	children,
	href,
	variant = "primary",
	icon,
}: {
	children: React.ReactNode;
	href?: string;
	variant?: keyof typeof variants;
	icon?: React.ReactNode;
}) {
	const external = !href?.startsWith("/");

	return (
		<a
			href={href}
			rel={external ? "noreferrer noopener" : ""}
			target={external ? "_blank" : ""}
			className={clsx("flex items-center transition-colors", variants[variant])}
		>
			{icon ? (
				<div
					// 3.825rem is the height of the button without an icon
					// if I could auto calc this I would but it's non-trivial
					className="size-[3.825rem] grid place-items-center border-r shrink-0"
				>
					{icon}
				</div>
			) : null}
			<div
				className={clsx(
					"w-full text-lg font-extrabold uppercase capsize p-6",
					// 5.325 is the width of the icon + p-6
					icon ? "sm:pr-[5.325rem] sm:text-center" : "text-center",
				)}
			>
				{children}
			</div>
		</a>
	);
}
