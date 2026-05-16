import type { WeightUnit } from '@/types/weight.types'
import clsx from 'clsx'

interface Props {
	value: WeightUnit
	onChange: (unit: WeightUnit) => void
}

export function WeightUnitToggle({ value, onChange }: Props) {
	return (
		<div className='flex items-center bg-white rounded-full p-1 gap-1 mt-10 shadow-sm'>
			{(['lbs', 'kg'] as WeightUnit[]).map(u => (
				<button
					key={u}
					onClick={() => onChange(u)}
					className={clsx(
						'px-6 py-2 rounded-full text-[15px] font-medium transition-all duration-200',
						value === u ? 'text-white bg-green-500' : 'text-gray-400',
					)}
				>
					{u}
				</button>
			))}
		</div>
	)
}
