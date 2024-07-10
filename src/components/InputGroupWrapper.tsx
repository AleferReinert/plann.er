import { ComponentProps } from 'react'

interface InputGroupWrapper extends ComponentProps<'div'> {
	theme?: 'default' | 'dark'
	size?: 'sm' | 'md'
}

export function InputGroupWrapper({ children, theme = 'default', size = 'md' }: InputGroupWrapper) {
	return (
		<div
			className={`
				${theme === 'default' ? 'bg-zinc-900 ' : 'bg-zinc-950 '}
				${size === 'md' ? 'p-4 text-lg ' : 'py-2 px-3 text-base '}
				 text-zinc-400 border-zinc-800 
				rounded-xl w-full flex flex-col md:flex-row gap-5 items-center border 
				[&_input]:placeholder-zinc-400 
				[&_label]:w-full md:[&_label]:w-auto
				[&_input]:w-full
				[&_button]:w-full md:[&_button]:w-auto
			`}
		>
			{children}
		</div>
	)
}
