import { WeightHint } from '@/components/common/Weight/WeightHint'
import { WeightInput } from '@/components/common/Weight/WeightInput'
import { WeightUnitToggle } from '@/components/common/Weight/WeightUnitToggle'
import { Button } from '@/components/ui/Button'
import { Title } from '@/components/ui/Title'
import { useWeightInput } from '@/hooks/useWeightInput'
import type { WeightUnit } from '@/types/weight.types'

interface Props {
	value: { value: number; unit: WeightUnit } | null
	onChange: (v: { value: number; unit: WeightUnit }) => void
	onContinue: () => void
}

export function Screen2({ value, onChange, onContinue }: Props) {
	const { unit, input, min, max, isValid, handleUnitChange, handleChange } =
		useWeightInput({ initial: value, onChange })

	return (
		<div className='flex h-full flex-col items-center px-4 py-12'>
			<div className='flex flex-col items-center w-full max-w-115'>
				<Title title='What is your weight?' />

				<WeightUnitToggle value={unit} onChange={handleUnitChange} />

				<WeightInput
					value={input}
					unit={unit}
					isValid={isValid}
					onChange={handleChange}
				/>

				<WeightHint min={min} max={max} unit={unit} />

				<div className='pt-12'>
					<Button onClick={onContinue} disabled={!isValid}>
						Continue
					</Button>
				</div>
			</div>
		</div>
	)
}
