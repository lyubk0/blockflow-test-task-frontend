import { Option } from '@/components/ui/Option'
import { OPTIONS } from './option-list.constant'

interface Props {
	selected: string | null
	onSelect: (id: string) => void
}

export const OptionList = ({ selected, onSelect }: Props) => {
	return (
		<ul className='flex flex-col gap-4'>
			{OPTIONS.map(opt => {
				const isSelected = selected === opt.id
				return (
					<li key={opt.id}>
						<Option
							onClick={() => onSelect(opt.id)}
							emoji={opt.emoji}
							label={opt.label}
							selected={isSelected}
						/>
					</li>
				)
			})}
		</ul>
	)
}
