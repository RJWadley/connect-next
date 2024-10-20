import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { ManifestAssets } from "./components/ManifestAssets";
import { TanstackProvider } from "./components/TanstackProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		// capsize needs text sizing context
		<html lang="en" className="font-sans text-base leading-none">
			<ManifestAssets />
			<body
				className={clsx(
					"bg-white text-black border-black dark:bg-black dark:text-white dark:border-white",
					inter.className,
				)}
			>
				<TanstackProvider>{children}</TanstackProvider>
			</body>
		</html>
	);
}
