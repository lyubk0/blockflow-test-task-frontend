import type { JobResult as JobResultData } from '@/types/job.types'

interface Props {
	result: JobResultData | null
	onReset: () => void
}

export function JobResult({ result, onReset }: Props) {
	return (
		<div className='flex flex-col items-center w-full gap-6'>
			<div className='w-full rounded-2xl border border-gray-200 bg-white px-6 py-5 shadow-sm'>
				<p className='text-[15px] font-semibold text-gray-900 mb-3'>Result</p>
				<pre className='text-[12px] text-gray-500 whitespace-pre-wrap break-all leading-relaxed'>
					{JSON.stringify(result, null, 2)}
				</pre>
			</div>

			<button
				onClick={onReset}
				className='text-[14px] font-medium text-gray-400 hover:text-gray-600 transition-colors underline underline-offset-2'
			>
				Reset
			</button>
		</div>
	)
}
