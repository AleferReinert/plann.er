import { ComponentProps } from 'react'

export function Container({ children, className }: ComponentProps<'div'>) {
	return <div className={`${className} px-3 mx-auto container`}>{children}</div>
}
