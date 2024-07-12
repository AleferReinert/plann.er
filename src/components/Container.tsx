import { ComponentProps } from 'react'

export function Container({ children, className }: ComponentProps<'div'>) {
	return <div className={`${className || ''} px-3 sm:px-6 mx-auto max-w-5xl`}>{children}</div>
}
