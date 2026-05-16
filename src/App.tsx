import { Stepper } from './components/common/Stepper'
import { TopBar } from './components/common/TopBar'
import { useOnboarding } from './hooks/useOnboarding'

function App() {
	const { current, steps, progress, goPrev } = useOnboarding()

	return (
		<div className='flex flex-col gap-6'>
			<TopBar progress={progress} onBack={goPrev} />
			<Stepper current={current} steps={steps} />
		</div>
	)
}

export default App
