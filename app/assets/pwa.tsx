import { appleDeviceSpecsForLaunchImages } from "pwa-asset-generator";
import { Fragment } from "react";

export function ManifestAssets() {
	return (
		<>
			<link rel="apple-touch-icon" href="/pwa/apple-icon-180.png" />
			<meta name="apple-mobile-web-app-capable" content="yes" />
			<meta name="mobile-web-app-capable" content="yes" />
			{appleDeviceSpecsForLaunchImages.map((spec) => {
				return (
					<Fragment key={`apple-splash-${spec.device}`}>
						{/* light mode */}
						<link
							rel="apple-touch-startup-image"
							href={`/pwa/apple-splash-${spec.portrait.width}-${spec.portrait.height}.png`}
							media={`(device-width: ${
								spec.portrait.width / spec.scaleFactor
							}px) and (device-height: ${
								spec.portrait.height / spec.scaleFactor
							}px) and (-webkit-device-pixel-ratio: ${
								spec.scaleFactor
							}) and (orientation: portrait)`}
						/>
						<link
							rel="apple-touch-startup-image"
							href={`/pwa/apple-splash-${spec.portrait.width}-${spec.portrait.height}.png`}
							media={`(device-width: ${
								spec.portrait.height / spec.scaleFactor
							}px) and (device-height: ${
								spec.portrait.width / spec.scaleFactor
							}px) and (-webkit-device-pixel-ratio: ${
								spec.scaleFactor
							}) and (orientation: landscape)`}
						/>
						{/* dark mode */}
						<link
							rel="apple-touch-startup-image"
							href={`/pwa/apple-splash-dark-${spec.portrait.width}-${spec.portrait.height}.png`}
							media={`(prefers-color-scheme: dark) and (device-width: ${
								spec.portrait.width / spec.scaleFactor
							}px) and (device-height: ${
								spec.portrait.height / spec.scaleFactor
							}px) and (-webkit-device-pixel-ratio: ${
								spec.scaleFactor
							}) and (orientation: portrait)`}
						/>
						<link
							rel="apple-touch-startup-image"
							href={`/pwa/apple-splash-dark-${spec.portrait.width}-${spec.portrait.height}.png`}
							media={`(prefers-color-scheme: dark) and (device-width: ${
								spec.portrait.height / spec.scaleFactor
							}px) and (device-height: ${
								spec.portrait.width / spec.scaleFactor
							}px) and (-webkit-device-pixel-ratio: ${
								spec.scaleFactor
							}) and (orientation: landscape)`}
						/>
					</Fragment>
				);
			})}
		</>
	);
}
