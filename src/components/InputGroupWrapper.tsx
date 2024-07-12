import { ComponentProps } from 'react'

interface InputGroupWrapper extends ComponentProps<'div'> {
	theme?: 'default' | 'dark'
	size?: 'md' | 'lg'
}

export function InputGroupWrapper({
	children,
	theme = 'default',
	size = 'md',
	className
}: InputGroupWrapper) {
	return (
		<div
			className={`
				${theme === 'default' ? 'bg-zinc-900 ' : 'bg-zinc-950 '}
				${size === 'lg' ? 'p-3 text-lg ' : ''}
				${size === 'md' ? 'py-2 px-3 text-base ' : ''}
			 border-zinc-800 
				rounded-xl w-full flex flex-col md:flex-row gap-5 items-center border 
				[&_button]:w-full md:[&_button]:w-auto
				${className || ''}
			`}
		>
			{children}
		</div>
	)
}
