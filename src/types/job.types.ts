import type { WeightUnit } from '@/types/weight.types'

export const JOB_STATUS = {
	QUEUED: 'queued',
	PROCESSING: 'processing',
	DONE: 'done',
	FAILED: 'failed',
} as const

export type JobStatus = (typeof JOB_STATUS)[keyof typeof JOB_STATUS]

export interface WeightValue {
	value: number
	unit: WeightUnit
}

export interface JobInput {
	selectedOption: string
	currentWeight: WeightValue
	goalWeight: WeightValue
}

export interface JobResult {
	summary: string
	computedValue: number
	finishedAt: string
}

export interface JobCreatedResponse {
	id?: string
	_id?: string | { toString(): string }
}

export interface JobSnapshot {
	status: JobStatus
	progress?: number
	result?: JobResult
	error?: string
}

export interface JobWsCallbacks {
	onMessage: (data: JobSnapshot) => void
	onError?: () => void
	onClose?: (wasClean: boolean) => void
}
