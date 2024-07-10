import { X } from 'lucide-react'
import { ReactNode } from 'react'

interface ModalProps {
	title: string
	description: ReactNode
	children: ReactNode
	setGuestsModal: React.Dispatch<React.SetStateAction<boolean>>
}

export function Modal({ title, description, children, setGuestsModal }: ModalProps) {
	return (
		<div className='fixed inset-0 flex justify-center items-center z-40 bg-black/60'>
			<section className='max-w-[640px] bg-zinc-900 px-6 py-5'>
				<header className='mb-5'>
					<div className='flex justify-between items-start mb-2'>
						<h2 className='text-white text-lg font-semibold leading-none'>{title}</h2>
						<button title='Fechar'>
							<X className='text-zinc-400' size={20} onClick={() => setGuestsModal(false)} />
						</button>
					</div>
					<p className='text-zinc-400 text-sm'>{description}</p>
				</header>
				{children}
			</section>
		</div>
	)
}