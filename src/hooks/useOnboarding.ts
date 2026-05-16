import type { OnboardingData } from '@/types/onboarding.types'
import { getOnboardingSteps } from '@/utils/getOnboardingSteps'
import { useCallback, useMemo, useState } from 'react'

export function useOnboarding() {
	const [current, setCurrent] = useState(0)
	const [data, setData] = useState<OnboardingData>({
		wish: null,
		currentWeight: null,
		goalWeight: null,
	})

	const update = useCallback(
		<K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) => {
			setData(d => ({ ...d, [key]: value }))
		},
		[],
	)

	const goNext = useCallback(() => setCurrent(c => c + 1), [])
	const goPrev = useCallback(() => setCurrent(c => Math.max(0, c - 1)), [])

	const reset = useCallback(() => {
		setCurrent(0)
		setData({ wish: null, currentWeight: null, goalWeight: null })
	}, [])

	const steps = useMemo(
		() => getOnboardingSteps({ data, goNext, goPrev, reset, update }),
		[data, goNext, goPrev, reset, update],
	)

	const totalSteps = steps.length
	const progress = totalSteps > 0 ? ((current + 1) / totalSteps) * 100 : 0

	return { current, data, steps, progress, goNext, goPrev, reset, update }
}
