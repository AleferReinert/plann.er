import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const buttonVariants = tv({
	base: 'justify-center px-5 flex gap-2 rounded-lg items-center text-base font-medium text-nowrap transition',
	variants: {
		variant: {
			primary: 'bg-lime-300 text-lime-950',
			secondary: 'bg-zinc-800 text-zinc-200'
		},
		size: {
			sm: 'h-9',
			md: 'h-10'
		},
		disabled: {
			true: 'opacity-60'
		}
	},
	defaultVariants: {
		variant: 'primary',
		size: 'sm'
	}
})

interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants> {}

export function Button({ variant, size, disabled, ...props }: ButtonProps) {
	return (
		<button
			{...props}
			disabled={disabled}
			className={buttonVariants({ variant, size, disabled }) + ' ' + (props.className ?? '')}
		>
			{props.children}
		</button>
	)
}
