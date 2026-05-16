import type { HttpClient } from '@/services/api/http.client'
import type {
	JobCreatedResponse,
	JobInput,
	JobSnapshot,
	JobWsCallbacks,
} from '@/types/job.types'
import { parseJobId } from '@/utils/parseJobId'
import { connectJobWebSocket } from './job.ws'

export class JobService {
	private readonly http: HttpClient

	constructor(http: HttpClient) {
		this.http = http
	}

	async create(input: JobInput): Promise<string> {
		const job = await this.http.post<JobCreatedResponse>('/jobs', input)
		return parseJobId(job)
	}

	getById(id: string): Promise<JobSnapshot> {
		return this.http.get<JobSnapshot>(`/jobs/${id}`)
	}

	subscribe(jobId: string, callbacks: JobWsCallbacks): () => void {
		return connectJobWebSocket(jobId, callbacks)
	}
}
