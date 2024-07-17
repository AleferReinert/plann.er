import { Link2, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../lib/axios'
import { Button } from './Button'

export interface ImportantLinksProps {
	setCreateLinkModal: React.Dispatch<React.SetStateAction<boolean>>
}

interface Link {
	id: string
	title: string
	url: string
}

export function ImportantLinks({ setCreateLinkModal }: ImportantLinksProps) {
	const { tripId } = useParams()
	const [links, setLinks] = useState<Link[]>([])

	useEffect(() => {
		api.get(`/trips/${tripId}/links`).then(response => {
			setLinks(response.data.links)
		})
	}, [tripId])

	return (
		<div className='space-y-6'>
			<h2 className='font-semibold text-xl texct-zinc-50 leading-none'>Links importantes</h2>

			<ul className='space-y-5'>
				{links.map((link, index) => (
					<li key={index} className='space-y-2'>
						<a href={link.url} target='_blank' className='w-full flex items-center justify-between'>
							<div>
								<h3 className='text-base font-medium text-zinc-100 mb-1'>{link.title}</h3>
								<p className='text-xs text-zinc-400 max-w-60 truncate'>{link.url}</p>
							</div>
							<Link2 size={20} />
						</a>
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
