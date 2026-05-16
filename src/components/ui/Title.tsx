interface Props {
	title: string
}

export const Title = ({ title }: Props) => {
	return (
		<h1 className='text-[36px]  text-foreground-neutral-primary mb-8 tracking-tight'>
			{title}
		</h1>
	)
}
