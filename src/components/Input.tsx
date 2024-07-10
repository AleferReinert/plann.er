import { ComponentProps, ReactNode } from 'react'

interface InputProps extends ComponentProps<'input'> {
	icon: ReactNode
	labelStyles?: string
	inputStyles?: string
}

export function Input({ icon, labelStyles, inputStyles, ...props }: InputProps) {
	return (
		<label className={`${labelStyles || ''} flex gap-2 items-center`}>
			{icon}
			<input type='text' className={`${inputStyles || ''} bg-transparent w-full`} {...props} />
		</label>
	)
}
