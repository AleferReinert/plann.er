import { Mail, Plus, X } from 'lucide-react'
import { Button } from './Button'
import { Input } from './Input'
import { InputGroupWrapper } from './InputGroupWrapper'

interface FormAddParticipantsProps {
	participantEmails: string[]
	addParticipantEmail(newEmail: string): void
	deleteParticipantEmail(emailToRemove: string): void
	newParticipantEmail: string
	setNewParticipantEmail: React.Dispatch<React.SetStateAction<string>>
}

export function FormAddParticipants({
	participantEmails,
	addParticipantEmail,
	deleteParticipantEmail,
	newParticipantEmail,
	setNewParticipantEmail
}: FormAddParticipantsProps) {
	const addEmailOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault()
			addParticipantEmail(newParticipantEmail)
		}
	}
	return (
		<div>
			<div className='flex gap-2 flex-wrap'>
				{participantEmails.map((participantEmail, index) => (
					<div
						key={index}
						className='rounded-md space-x-2 bg-zinc-800 py-1 px-2 text-base text-zinc-300 mb-5 flex gap-2 items-center'
					>
						{participantEmail}
						<button title='Remover' onClick={() => deleteParticipantEmail(participantEmail)} type='button'>
							<X size={16} />
						</button>
					</div>
				))}
			</div>
			<div className='h-[1px] bg-zinc-800 mb-5'></div>
			<InputGroupWrapper theme='dark' size='md'>
				{/* todo: validate email */}
				<Input
					placeholder='Digite o e-mail do convidado'
					icon={<Mail size={20} />}
					labelStyles='flex-1'
					value={newParticipantEmail}
					onChange={e => setNewParticipantEmail(e.currentTarget.value)}
					type='email'
					autoFocus
					onKeyDown={addEmailOnEnter}
				/>
				<Button onClick={() => addParticipantEmail(newParticipantEmail)} type='button' disabled={!newParticipantEmail}>
					Convidar
					<Plus size={20} />
				</Button>
			</InputGroupWrapper>
		</div>
	)
}
