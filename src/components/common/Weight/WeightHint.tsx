import type { WeightUnit } from '@/types/weight.types'

interface Props {
	min: number
	max: number
	unit: WeightUnit
}

export function WeightHint({ min, max, unit }: Props) {
	return (
		<p className='text-[14px] text-gray-400 mt-3 text-center'>
			Please enter a value between{' '}
			<span className='font-semibold text-gray-600'>
				{min} {unit}
			</span>{' '}
			and{' '}
			<span className='font-semibold text-gray-600'>
				{max} {unit}
			</span>
		</p>
	)
}
