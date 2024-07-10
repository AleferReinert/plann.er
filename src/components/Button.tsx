import { ComponentProps } from 'react'

interface ButtonProps extends ComponentProps<'button'> {
	variant?: 'primary' | 'secondary'
	full?: boolean
	size?: 'sm' | 'md'
}

export function Button({ variant = 'primary', full, size = 'sm', ...props }: ButtonProps) {
	return (
		<button
			{...props}
			className={`
				${variant === 'primary' ? 'bg-lime-300 text-lime-950 ' : 'bg-zinc-800 text-zinc-200 '} 
				${full ? 'w-full ' : ''} 
				${props.disabled ? 'opacity-60 ' : ''} 
				${size === 'sm' ? 'h-9 ' : 'h-10 '}
				${props.className || ''} 
				justify-center px-5 flex gap-2 rounded-lg items-center text-base font-medium text-nowrap
			`}
		>
			{props.children}
		</button>
	)
}
