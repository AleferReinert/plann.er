import { CircleCheck, CircleDashed, UserCog } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../lib/axios'
import { Button } from './Button'

interface Participant {
	id: string
	name: string | null
	email: string
	is_confirmed: boolean
}

export function ParticipantsList() {
	const { tripId } = useParams()
	const [participants, setParticipants] = useState<Participant[]>([])

	useEffect(() => {
		api.get(`/trips/${tripId}/participants`).then(response => {
			setParticipants(response.data.participants)
		})
	}, [tripId])

	return (
		<div className='space-y-6'>
			<h2 className='font-semibold text-xl texct-zinc-50 leading-none'>Convidados</h2>

			<ul className='space-y-5'>
				{participants.map((participant, index) => (
					<li key={index} className='flex items-center justify-between gap-2'>
						<div>
							<h3 className='text-base font-medium text-zinc-100 mb-1'>{participant.name || `Convidado`}</h3>
							<p className='text-xs text-zinc-400'>{participant.email}</p>
						</div>
						{participant.is_confirmed ? (
							<CircleCheck className='text-lime-300' size={20} />
						) : (
							<CircleDashed className='text-zinc-400' size={20} />
						)}
					</li>
				))}
			</ul>
			<Button variant='secondary' className='w-full'>
				<UserCog size={20} />
				Gerenciar convidados
			</Button>
		</div>
	)
}
