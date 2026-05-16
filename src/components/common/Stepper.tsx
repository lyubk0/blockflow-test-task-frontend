interface Props {
	steps: React.ReactNode[]
	current: number
	className?: string
}

export const Stepper = ({ steps, current, className }: Props) => {
	return <div className={className}>{steps[current]}</div>
}
