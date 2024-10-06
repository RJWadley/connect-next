bunx pwa-asset-generator public/icon-light.svg public/pwa --manifest app/manifest.webmanifest --scrape false --xhtml --path-override 'pwa' --background 'white'
bunx pwa-asset-generator public/icon-dark.svg public/pwa --manifest app/manifest.webmanifest --scrape false --xhtml --path-override 'pwa' --background '#141414' --dark-mode
bun biome check app/manifest.webmanifest --write