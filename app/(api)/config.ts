export const ATHENA_URL = "https://athena.comma.ai";
export const BASE_URL = "https://api.comma.ai";
export const BILLING_URL = "https://billing.comma.ai";
// CF_PAGES_URL is a cloudflare env value
export const getService = () =>
	process.env.CF_PAGES_URL
		? new URL(process.env.CF_PAGES_URL).hostname
		: "localhost:3000";
