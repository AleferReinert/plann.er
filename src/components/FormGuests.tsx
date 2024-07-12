import { AtSign, Plus, X } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from './Button'
import { Input } from './Input'
import { InputGroupWrapper } from './InputGroupWrapper'

interface FormGuestsProps {
	guestEmails: string[]
	setGuestEmails: React.Dispatch<React.SetStateAction<string[]>>
}

export function FormGuests({ guestEmails, setGuestEmails }: FormGuestsProps) {
	const [newEmail, setNewEmail] = useState('')

	function updateGuestEmails(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		if (guestEmails.includes(newEmail)) {
			toast.error('E-mail duplicado.')
			return
		}

		// Add new email
		if (newEmail) {
			setGuestEmails([...guestEmails, newEmail])
			setNewEmail('')
		}
	}

	function deleteEmail(emailToRemove: string) {
		setGuestEmails(guestEmails.filter(guestEmail => guestEmail !== emailToRemove))
	}

	return (
		<div>
			<div className='flex gap-2 flex-wrap'>
				{guestEmails.map((guestEmail, index) => (
					<div
						key={index}
						className='rounded-md space-x-2 bg-zinc-800 py-1 px-2 text-base text-zinc-300 mb-5 flex gap-2 items-center'
					>
						{guestEmail}
						<button title='Remover' onClick={() => deleteEmail(guestEmail)}>
							<X size={16} />
						</button>
					</div>
				))}
			</div>
			<div className='h-[1px] bg-zinc-800 mb-5'></div>
			<form onSubmit={e => updateGuestEmails(e)}>
				<InputGroupWrapper theme='dark' size='md'>
					<Input
						placeholder='Digite o e-mail do convidado'
						icon={<AtSign size={20} />}
						labelStyles='flex-1'
						value={newEmail}
						onChange={e => setNewEmail(e.target.value)}
						type='email'
						autoFocus
						required
					/>
					<Button type='submit'>
						Convidar
						<Plus size={20} />
					</Button>
				</InputGroupWrapper>
			</form>
		</div>
	)
}
