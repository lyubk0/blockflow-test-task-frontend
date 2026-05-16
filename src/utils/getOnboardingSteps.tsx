import { Screen1 } from '@/screens/Screen1/Screen1'
import { Screen2 } from '@/screens/Screen2/Screen2'
import { Screen3 } from '@/screens/Screen3/Screen3'
import { Screen4 } from '@/screens/Screen4/Screen4'
import type { OnboardingData } from '@/types/onboarding.types'
import type { ReactNode } from 'react'

interface Params {
	data: OnboardingData
	goNext: () => void
	goPrev: () => void
	reset: () => void
	update: <K extends keyof OnboardingData>(
		key: K,
		value: OnboardingData[K],
	) => void
}

type StepFactory = (params: Params) => ReactNode

const stepFactories: StepFactory[] = [
	({ data, update, goNext }) => (
		<Screen1
			selected={data.wish}
			onSelect={v => {
				update('wish', v)
				goNext()
			}}
		/>
	),

	({ data, update, goNext }) => (
		<Screen2
			value={data.currentWeight}
			onChange={v => update('currentWeight', v)}
			onContinue={goNext}
		/>
	),

	({ data, update, goNext }) => (
		<Screen3
			value={data.goalWeight}
			onChange={v => update('goalWeight', v)}
			onContinue={goNext}
		/>
	),

	({ data, reset }) => <Screen4 data={data} onReset={reset} />,
]

export function getOnboardingSteps(params: Params): ReactNode[] {
	return stepFactories.map(factory => factory(params))
}
