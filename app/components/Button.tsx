import clsx from "clsx";

const variants = {
	accent: "bg-green text-black",
	primary: "bg-black text-white dark:bg-white dark:text-black",
	secondary: "bg-white text-black dark:bg-black dark:text-white border",
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
	return (
		<a
			href={href}
			className={clsx("grid grid-cols-[3.825rem_1fr]", variants[variant])}
		>
			{icon ? (
				<div
					className={
						"aspect-square grid place-items-center border-r place-self-stretch"
					}
				>
					{icon}
				</div>
			) : null}
			<div
				className={clsx(
					"p-6 capsize text-lg font-extrabold uppercase",
					!icon && "text-center col-span-2",
				)}
			>
				{children}
			</div>
		</a>
	);
}
