"use client";

export function DisplayDate({
	children,
	options,
	className,
}: {
	children: string | number | undefined;
	options?: Intl.DateTimeFormatOptions;
	className?: string;
}) {
	if (!children) return <div className={className}>No Date</div>;

	try {
		const date = new Date(children);

		const formatter = new Intl.DateTimeFormat(undefined, options);
		const formatted = formatter.format(date);

		return (
			<time
				dateTime={date.toISOString()}
				suppressHydrationWarning
				className={className}
			>
				{formatted}
			</time>
		);
	} catch (e) {
		return <div className={className}>Invalid Date</div>;
	}
}
