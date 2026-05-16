import type { JobCreatedResponse } from '@/types/job.types'

export function parseJobId(job: JobCreatedResponse): string {
	if (job.id) return job.id
	if (job._id != null) {
		return typeof job._id === 'string' ? job._id : job._id.toString()
	}
	throw new Error('Job id missing in response')
}
