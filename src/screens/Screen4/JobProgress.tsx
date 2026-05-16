interface DeterminateProps {
	type: 'determinate'
	progress: number
}

interface IndeterminateProps {
	type: 'indeterminate'
}

type Props = DeterminateProps | IndeterminateProps

export function JobProgress(props: Props) {
	const isDeterminate = props.type === 'determinate'

	return (
		<div className='w-full mt-8'>
			{isDeterminate && (
				<div className='flex justify-between mb-2'>
					<span className='text-[13px] text-gray-400'>Processing...</span>
					<span className='text-[13px] font-semibold text-gray-700'>
						{props.progress}%
					</span>
				</div>
			)}

			<div className='w-full h-2 bg-gray-100 rounded-full overflow-hidden'>
				{isDeterminate ? (
					<div
						className='h-full rounded-full transition-all duration-300'
						style={{
							width: `${props.progress}%`,
							background: 'var(--bg-primary-linear)',
						}}
					/>
				) : (
					<div
						className='h-full w-1/3 rounded-full animate-indeterminate'
						style={{ background: 'var(--bg-primary-linear)' }}
					/>
				)}
			</div>

			{!isDeterminate && (
				<p className='text-[13px] text-gray-400 mt-2'>Processing...</p>
			)}
		</div>
	)
}
