import { WeightHint } from '@/components/common/Weight/WeightHint'
import { WeightInput } from '@/components/common/Weight/WeightInput'
import { WeightUnitToggle } from '@/components/common/Weight/WeightUnitToggle'
import { Button } from '@/components/ui/Button'
import { InfoAlert } from '@/components/ui/InfoAlert'
import { Title } from '@/components/ui/Title'
import { useWeightInput } from '@/hooks/useWeightInput'
import type { WeightUnit } from '@/types/weight.types'

interface Props {
	value: { value: number; unit: WeightUnit } | null
	onChange: (v: { value: number; unit: WeightUnit }) => void
	onContinue: () => void
}

export function Screen3({ value, onChange, onContinue }: Props) {
	const { unit, input, min, max, isValid, handleUnitChange, handleChange } =
		useWeightInput({ initial: value, onChange })

	return (
		<div className='flex h-full flex-col items-center px-4 py-12'>
			<div className='flex flex-col items-center w-full max-w-115'>
				<Title title='What is your goal weight?' />

				<WeightUnitToggle value={unit} onChange={handleUnitChange} />

				<WeightInput
					value={input}
					unit={unit}
					isValid={isValid}
					onChange={handleChange}
				/>

				<WeightHint min={min} max={max} unit={unit} />
				<InfoAlert
					icon='⚖️'
					title='Goal: Lose 5% of your weight'
					description="Even small, steady changes can make a meaningful difference. We'll support you with a balanced plan to help you feel lighter, healthier, and more confident over time."
				/>
				<div className='pt-12'>
					<Button onClick={onContinue} disabled={!isValid}>
						Continue
					</Button>
				</div>
			</div>
		</div>
	)
}
