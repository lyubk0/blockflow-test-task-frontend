interface Props {
	current: number
	total: number
}

export const ProgressBar = ({ current, total }: Props) => {
	const progress = Math.round((current / total) * 100)

	return (
		<div className='rounded-full flex-1 h-2 bg-[#F1F0F6] w-full'>
			<div
				className='rounded-full h-2 transition-all duration-300'
				style={{
					width: `${progress}%`,
					background: 'var(--bg-primary-linear)',
				}}
			/>
		</div>
	)
}
