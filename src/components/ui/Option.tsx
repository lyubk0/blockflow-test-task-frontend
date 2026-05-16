import clsx from 'clsx'

interface Option {
	emoji: string
	label: string
	selected: boolean
	onClick: () => void
}

export function Option({ emoji, label, selected, onClick }: Option) {
	return (
		<button
			onClick={onClick}
			className={clsx(
				'flex cursor-pointer border shadow-xs border-[#DAD9E0] items-center gap-3 w-full px-5 py-4 rounded-2xl',
				'bg-white text-left transition-all duration-150',
				' font-normal text-foreground-neutral-primary',
				selected
					? 'ring-2 ring-green-500 shadow-none border-transparent'
					: 'ring-0 active:scale-[0.99]',
			)}
		>
			<span className='text-[22px] leading-none select-none'>{emoji}</span>
			<span>{label}</span>
		</button>
	)
}
