import { Link2, Plus } from 'lucide-react'
import { Button } from './Button'

export interface ImportantLinksProps {
	links: {
		title: string
		url: string
	}[]
	setCreateLinkModal: React.Dispatch<React.SetStateAction<boolean>>
}

export function ImportantLinks({ links, setCreateLinkModal }: ImportantLinksProps) {
	return (
		<div className='space-y-6'>
			<h2 className='font-semibold text-xl texct-zinc-50 leading-none'>Links importantes</h2>

			<ul className='space-y-5'>
				{links.map((link, index) => (
					<li key={index} className='flex items-center justify-between gap-2'>
						<div>
							<h3 className='text-base font-medium text-zinc-100 mb-1'>{link.title}</h3>
							<p className='text-xs text-zinc-400 max-w-60 truncate'>{link.url}</p>
						</div>
						<button>
							<Link2 size={20} />
						</button>
					</li>
				))}
			</ul>
			<Button variant='secondary' className='w-full' onClick={() => setCreateLinkModal(true)}>
				<Plus size={20} />
				Cadastrar novo link
			</Button>
		</div>
	)
}
