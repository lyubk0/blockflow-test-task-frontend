export function getApiUrl(): string {
	const url = import.meta.env.VITE_API_URL
	if (!url) throw new Error('VITE_API_URL is not configured')
	return url.replace(/\/$/, '')
}

export function getWsUrl(): string {
	const ws = import.meta.env.VITE_WS_URL
	if (ws) return ws.replace(/\/$/, '')

	const api = import.meta.env.VITE_API_URL
	if (api) return api.replace(/^http/, 'ws').replace(/\/$/, '')

	throw new Error('VITE_WS_URL or VITE_API_URL must be configured')
}
