import { Title } from '@/components/ui/Title'
import { useHttpJob } from '@/hooks/useHttpJob'
import { useWebSocketJob } from '@/hooks/useWebSocketJob'
import type { JobInput } from '@/types/job.types'
import type { OnboardingData } from '@/types/onboarding.types'
import { LaunchButtons } from './JobLaunchButtons'
import { JobProgress } from './JobProgress'
import { JobResult } from './JobResult'

interface Props {
	data: OnboardingData
	onReset: () => void
}

export function Screen4({ data, onReset }: Props) {
	const ws = useWebSocketJob()
	const http = useHttpJob()

	const jobInput: JobInput | null =
		data.wish && data.currentWeight && data.goalWeight
			? {
					selectedOption: data.wish,
					currentWeight: data.currentWeight,
					goalWeight: data.goalWeight,
				}
			: null

	const busy = ws.phase !== 'idle' || http.phase !== 'idle'
	const done = ws.phase === 'done' || http.phase === 'done'
	const result = ws.result ?? http.result ?? null

	const handleReset = () => {
		ws.reset()
		http.reset()
		onReset()
	}

	return (
		<div className='flex h-full flex-col items-center px-4 py-12'>
			<div className='flex flex-col items-center w-full max-w-115'>
				<Title title='Run a job' />

				<div className='w-full mt-10'>
					{done ? (
						<JobResult result={result} onReset={handleReset} />
					) : (
						<>
							<LaunchButtons
								disabled={busy || !jobInput}
								onWebSocket={() => jobInput && ws.start(jobInput)}
								onHttp={() => jobInput && http.start(jobInput)}
							/>

							{ws.phase === 'running' && (
								<JobProgress type='determinate' progress={ws.progress} />
							)}

							{http.phase === 'running' && <JobProgress type='indeterminate' />}

							{(ws.error || http.error) && (
								<p className='text-[13px] text-red-400 mt-4 text-center'>
									{ws.error ?? http.error}
								</p>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	)
}
