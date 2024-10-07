export const ATHENA_URL = "https://athena.comma.ai";
export const BASE_URL = "https://api.comma.ai";
export const BILLING_URL = "https://billing.comma.ai";
// API_HOST is a cloudflare env value
export const getService = () => process.env.API_HOST || "localhost:3000";
