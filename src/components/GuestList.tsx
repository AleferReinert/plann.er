import { CircleCheck, CircleDashed, UserCog } from 'lucide-react'
import { Button } from './Button'

export interface GuestListProps {
	guestList: {
		name: string
		email: string
		confirmed: boolean
	}[]
}

export function GuestList({ guestList }: GuestListProps) {
	return (
		<div className='space-y-6'>
			<h2 className='font-semibold text-xl texct-zinc-50 leading-none'>Convidados</h2>

			<ul className='space-y-5'>
				{guestList.map((guest, index) => (
					<li key={index} className='flex items-center justify-between gap-2'>
						<div>
							<h3 className='text-base font-medium text-zinc-100 mb-1'>{guest.name}</h3>
							<p className='text-xs text-zinc-400'>{guest.email}</p>
						</div>
						{guest.confirmed ? (
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
