import { ApiError } from './api.error'
import { getApiUrl } from './config'

export class HttpClient {
	private readonly baseUrl: string

	constructor(baseUrl = getApiUrl()) {
		this.baseUrl = baseUrl
	}

	async get<T>(path: string): Promise<T> {
		return this.request<T>(path)
	}

	async post<T>(path: string, body: unknown): Promise<T> {
		return this.request<T>(path, {
			method: 'POST',
			body: JSON.stringify(body),
		})
	}

	private async request<T>(path: string, init?: RequestInit): Promise<T> {
		const res = await fetch(`${this.baseUrl}${path}`, {
			...init,
			headers: {
				'Content-Type': 'application/json',
				...init?.headers,
			},
		})

		if (!res.ok) {
			const body = (await res.json().catch(() => null)) as { error?: string } | null
			throw new ApiError(body?.error ?? 'Request failed', res.status)
		}

		return res.json() as Promise<T>
	}
}
