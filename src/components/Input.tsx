import { ComponentProps, ReactNode } from 'react'

interface InputProps extends ComponentProps<'input'> {
	icon: ReactNode
	labelStyles?: string
	inputStyles?: string
}

export function Input({ icon, labelStyles, inputStyles, className, ...props }: InputProps) {
	return (
		<label className={`${labelStyles || ''} ${className || ''} flex gap-2 items-center w-full md:w-auto`}>
			{icon}
			<input
				type='text'
				className={`
					${inputStyles || ''} 
					bg-transparent w-full text-zinc-100 placeholder-zinc-400 leading-9
				`}
				{...props}
			/>
		</label>
	)
}
