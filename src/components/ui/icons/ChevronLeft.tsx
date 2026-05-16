interface Props {
	className?: string
}

export const ChevronLeft = ({ className }: Props) => {
	return (
		<svg
			className={className}
			width='28'
			height='28'
			viewBox='0 0 28 28'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M18.5832 22.1667L10.4165 14L18.5832 5.83337'
				stroke='#141415'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}
