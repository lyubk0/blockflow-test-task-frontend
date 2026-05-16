import { getWsUrl } from '@/services/api/config'
import type { JobWsCallbacks } from '@/types/job.types'

export function connectJobWebSocket(
	jobId: string,
	callbacks: JobWsCallbacks,
	wsBaseUrl = getWsUrl(),
): () => void {
	const ws = new WebSocket(`${wsBaseUrl}/ws?jobId=${jobId}`)

	ws.onmessage = e => {
		callbacks.onMessage(JSON.parse(e.data))
	}

	ws.onerror = () => {
		callbacks.onError?.()
	}

	ws.onclose = e => {
		callbacks.onClose?.(e.wasClean)
	}

	return () => {
		ws.onmessage = null
		ws.onerror = null
		ws.onclose = null
		ws.close()
	}
}
