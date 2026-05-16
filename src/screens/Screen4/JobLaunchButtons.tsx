import { Button } from '@/components/ui/Button'

interface Props {
	disabled: boolean
	onWebSocket: () => void
	onHttp: () => void
}

export function LaunchButtons({ disabled, onWebSocket, onHttp }: Props) {
	return (
		<div className='flex flex-col gap-3 w-full'>
			<Button onClick={() => onWebSocket()} disabled={disabled}>
				Launch via WebSocket
			</Button>
			<Button onClick={() => onHttp()} disabled={disabled}>
				Launch via HTTP
			</Button>
		</div>
	)
}
