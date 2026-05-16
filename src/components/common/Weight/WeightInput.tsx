import type { WeightUnit } from '@/types/weight.types'
import clsx from 'clsx'

interface Props {
	value: string
	unit: WeightUnit
	isValid: boolean
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function WeightInput({ value, unit, isValid, onChange }: Props) {
	return (
		<div className='flex items-baseline justify-center gap-3 mt-10'>
			<input
				type='number'
				value={value}
				onChange={onChange}
				placeholder='Weight'
				className={clsx(
					'text-[40px] font-semibold bg-transparent outline-none border-b-2 w-40 text-center',
					'placeholder:text-gray-300 text-gray-900',
					value && !isValid
						? 'border-red-400'
						: 'border-gray-300 focus:border-green-500',
				)}
			/>
			<span className='text-[40px] font-semibold text-gray-900'>{unit}</span>
		</div>
	)
}
