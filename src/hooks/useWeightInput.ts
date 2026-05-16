import { WEIGHT_LIMITS } from '@/constants/weight.constants'
import type { WeightUnit } from '@/types/weight.types'
import { useState } from 'react'

interface WeightValue {
	value: number
	unit: WeightUnit
}

interface UseWeightInputProps {
	initial: WeightValue | null
	onChange: (v: WeightValue) => void
}

export function useWeightInput({ initial, onChange }: UseWeightInputProps) {
	const [unit, setUnit] = useState<WeightUnit>(initial?.unit ?? 'lbs')
	const [input, setInput] = useState(initial?.value?.toString() ?? '')

	const { min, max } = WEIGHT_LIMITS[unit]
	const numeric = parseFloat(input)
	const isValid = !isNaN(numeric) && numeric >= min && numeric <= max

	const handleUnitChange = (u: WeightUnit) => {
		setUnit(u)
		setInput('')
		onChange({ value: 0, unit: u })
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const v = e.target.value
		setInput(v)
		const n = parseFloat(v)
		if (!isNaN(n)) onChange({ value: n, unit })
	}

	return { unit, input, min, max, isValid, handleUnitChange, handleChange }
}
