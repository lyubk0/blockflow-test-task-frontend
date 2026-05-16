import clsx from 'clsx'
import type { PropsWithChildren } from 'react'

interface Props {
	className?: string
}

export const Container = ({
	children,
	className,
}: PropsWithChildren<Props>) => {
	return (
		<div className={clsx('max-w-360 mx-auto px-4', className)}>{children}</div>
	)
}
