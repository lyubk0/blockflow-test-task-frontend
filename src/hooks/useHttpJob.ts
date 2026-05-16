import { ApiClient } from '@/services/api'
import type { JobInput, JobResult } from '@/types/job.types'
import { useCallback, useEffect, useRef, useState } from 'react'

type Phase = 'idle' | 'running' | 'done' | 'error'

interface State {
	phase: Phase
	result: JobResult | null
	error: string | null
}

const INITIAL_STATE: State = {
	phase: 'idle',
	result: null,
	error: null,
}

const POLL_INTERVAL_MS = 2500

export function useHttpJob() {
	const [state, setState] = useState<State>(INITIAL_STATE)
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

	const cleanup = () => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current)
			intervalRef.current = null
		}
	}

	useEffect(() => cleanup, [])

	const start = useCallback(async (input: JobInput) => {
		setState({ ...INITIAL_STATE, phase: 'running' })

		try {
			const jobId = await ApiClient.job.create(input)

			const poll = async () => {
				const data = await ApiClient.job.getById(jobId)

				if (data.status === 'done') {
					setState({
						phase: 'done',
						result: data.result ?? null,
						error: null,
					})
					cleanup()
				} else if (data.status === 'failed') {
					setState({
						phase: 'error',
						result: null,
						error: data.error ?? 'Job failed',
					})
					cleanup()
				}
			}

			await poll()
			intervalRef.current = setInterval(() => {
				poll().catch(err => {
					setState({
						phase: 'error',
						result: null,
						error: err instanceof Error ? err.message : 'Polling error',
					})
					cleanup()
				})
			}, POLL_INTERVAL_MS)
		} catch (err) {
			setState({
				phase: 'error',
				result: null,
				error: err instanceof Error ? err.message : 'Unknown error',
			})
		}
	}, [])

	const reset = useCallback(() => {
		cleanup()
		setState(INITIAL_STATE)
	}, [])

	return { ...state, start, reset }
}
