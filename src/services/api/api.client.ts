import { HttpClient } from './http.client'
import { JobService } from '../job/job.service'

class ApiClientImpl {
	readonly job: JobService

	constructor() {
		const http = new HttpClient()
		this.job = new JobService(http)
	}
}

export const ApiClient = new ApiClientImpl()
