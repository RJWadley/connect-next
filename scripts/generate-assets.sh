# generate a base set of icons & splash screens
bunx pwa-asset-generator public/icon-light.svg public/pwa --scrape false --background 'white'
bunx pwa-asset-generator public/icon-dark.svg public/pwa --scrape false --background '#141414' --dark-mode

# generate non-maskable icons
bunx pwa-asset-generator public/icon-dark.svg public/pwa --padding 0 --scrape false --background '#141414' --dark-mode --icon-only --maskable false
