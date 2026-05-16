import { ChevronLeft } from '../ui/icons/ChevronLeft'
import { ProgressBar } from '../ui/ProgressBar'
import { Container } from './Container'

interface Props {
	progress: number
	onBack: () => void
}

export const TopBar = ({ progress, onBack }: Props) => {
	return (
		<div className='bg-white  h-18 border-b border-[#DAD9E0]'>
			<Container className='flex gap-12 h-full items-center'>
				<button className='cursor-pointer' onClick={onBack}>
					<ChevronLeft />
				</button>
				<ProgressBar current={progress} total={100} />
			</Container>
		</div>
	)
}
