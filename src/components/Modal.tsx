import { X } from 'lucide-react'
import { ReactNode } from 'react'

interface ModalProps {
	title: string
	description: ReactNode
	children: ReactNode
	closeModal: React.Dispatch<React.SetStateAction<boolean>>
	size?: 'default' | 'auto'
}

export function Modal({ title, description, children, closeModal, size = 'default' }: ModalProps) {
	return (
		<div className='fixed inset-0 flex justify-center items-center z-40 bg-black/60'>
			<section
				className={`
					${size === 'default' ? 'w-full max-w-[640px] ' : ''}
					bg-zinc-900 px-6 py-5 rounded-xl
				`}
			>
				<header className='mb-5'>
					<div className='flex justify-between items-start mb-2'>
						<h2 className='text-white text-lg font-semibold leading-none'>{title}</h2>
						<button title='Fechar'>
							<X
								className='text-zinc-400 hover:text-lime-300 transition'
								size={20}
								onClick={() => closeModal(false)}
							/>
						</button>
					</div>
					<p className='text-zinc-400 text-sm'>{description}</p>
				</header>
				{children}
			</section>
		</div>
	)
}
