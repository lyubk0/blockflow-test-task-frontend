import type { ReactNode } from 'react'

interface Props {
	icon?: ReactNode
	title: string
	description: string
}

export function InfoAlert({ icon, title, description }: Props) {
	return (
		<div className='w-full rounded-2xl border border-gray-200 bg-white px-6 py-5 text-center shadow-sm mt-10'>
			<p className='flex items-center justify-center gap-2 text-[15px] font-semibold text-gray-900'>
				{icon && <span className='text-[18px]'>{icon}</span>}
				{title}
			</p>
			<p className='mt-2 text-[13px] leading-relaxed text-gray-400'>
				{description}
			</p>
		</div>
	)
}
