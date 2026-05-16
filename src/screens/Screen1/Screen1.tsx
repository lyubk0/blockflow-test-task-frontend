import { Title } from '@/components/ui/Title'
import { OptionList } from './OptionList'

interface Screen1Props {
	selected: string | null
	onSelect: (id: string) => void
}

export function Screen1({ selected, onSelect }: Screen1Props) {
	return (
		<div className='flex flex-col items-center justify-center px-4 py-12'>
			<Title title='What is your main wish?' />

			<div className='w-full max-w-115 flex flex-col gap-3'>
				<OptionList selected={selected} onSelect={onSelect} />
			</div>
		</div>
	)
}
