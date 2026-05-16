import clsx from 'clsx'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode
	onClick?: () => void
	disabled?: boolean
	className?: string
}

export const Button = ({ children, onClick, disabled, className }: Props) => {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={clsx(
				'relative px-6 py-3 rounded-xl text-white font-medium text-sm',
				'transition-all duration-200 ease-out',
				'hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]',
				'disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100',
				className,
			)}
			style={{ background: 'var(--bg-primary-linear)' }}
		>
			{children}
		</button>
	)
}
