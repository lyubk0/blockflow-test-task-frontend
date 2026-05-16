import { ApiClient } from '@/services/api'
import type { JobInput, JobResult, JobSnapshot } from '@/types/job.types'
import { useCallback, useEffect, useRef, useState } from 'react'

type Phase = 'idle' | 'running' | 'done' | 'error'

interface State {
	phase: Phase
	progress: number
	result: JobResult | null
	error: string | null
}

const INITIAL_STATE: State = {
	phase: 'idle',
	progress: 0,
	result: null,
	error: null,
}

function applyWsMessage(
	prev: State,
	data: JobSnapshot,
	disconnect: () => void,
): State {
	if (data.status === 'done') {
		disconnect()
		return {
			phase: 'done',
			progress: 100,
			result: data.result ?? null,
			error: null,
		}
	}

	if (data.status === 'failed') {
		disconnect()
		return {
			phase: 'error',
			progress: 0,
			result: null,
			error: data.error ?? 'Job failed',
		}
	}

	return {
		...prev,
		phase: 'running',
		progress: data.progress ?? prev.progress,
	}
}

export function useWebSocketJob() {
	const [state, setState] = useState<State>(INITIAL_STATE)
	const disconnectRef = useRef<(() => void) | null>(null)

	const cleanup = useCallback(() => {
		disconnectRef.current?.()
		disconnectRef.current = null
	}, [])

	useEffect(() => {
		return () => cleanup()
	}, [cleanup])

	const start = useCallback(
		async (input: JobInput) => {
			cleanup()
			setState({ ...INITIAL_STATE, phase: 'running' })

			try {
				const jobId = await ApiClient.job.create(input)

				disconnectRef.current = ApiClient.job.subscribe(jobId, {
					onMessage: data => {
						setState(prev => applyWsMessage(prev, data, cleanup))
					},
					onError: () => {
						setState(s => ({
							...s,
							phase: 'error',
							error: 'WebSocket error',
						}))
						cleanup()
					},
					onClose: wasClean => {
						if (!wasClean) {
							setState(s =>
								s.phase === 'running'
									? {
											...s,
											phase: 'error',
											error: 'Connection closed unexpectedly',
										}
									: s,
							)
						}
					},
				})
			} catch (err) {
				setState(s => ({
					...s,
					phase: 'error',
					error: err instanceof Error ? err.message : 'Unknown error',
				}))
			}
		},
		[cleanup],
	)

	const reset = useCallback(() => {
		cleanup()
		setState(INITIAL_STATE)
	}, [cleanup])

	return { ...state, start, reset }
}
