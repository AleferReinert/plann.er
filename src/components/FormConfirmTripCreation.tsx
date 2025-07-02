// Modal que aparece ao clicar no botão "Confirmar viagem" na homepage
import { Mail, User } from 'lucide-react'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { useNavigate } from 'react-router-dom'
import { createTrip } from '../utils/createTrip'
import { Button } from './Button'
import { Input } from './Input'
import { InputGroupWrapper } from './InputGroupWrapper'
import { Loading } from './Loading'

interface FormConfirmTripCreationProps {
	ownerName: string
	setOwnerName: React.Dispatch<React.SetStateAction<string>>
	ownerEmail: string
	setOwnerEmail: React.Dispatch<React.SetStateAction<string>>
	destination: string
	date: DateRange | undefined
	participantEmails: string[]
}

export function FormConfirmTripCreation({
	ownerName,
	setOwnerName,
	ownerEmail,
	setOwnerEmail,
	destination,
	date,
	participantEmails
}: FormConfirmTripCreationProps) {
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		createTrip({ destination, date, participantEmails, ownerName, ownerEmail, setLoading, navigate })
	}

	return (
		<div>
			<form className='space-y-3' onSubmit={handleSubmit}>
				<InputGroupWrapper theme='dark'>
					<Input
						placeholder='Seu nome completo'
						value={ownerName}
						onChange={e => setOwnerName(e.target.value)}
						icon={<User size={20} />}
						type='text'
						autoFocus
						required
					/>
				</InputGroupWrapper>
				<InputGroupWrapper theme='dark'>
					{/* todo: validate email */}
					<Input
						placeholder='Seu e-mail pessoal'
						value={ownerEmail}
						onChange={e => setOwnerEmail(e.target.value)}
						icon={<Mail size={20} />}
						type='email'
						required
					/>
				</InputGroupWrapper>
				<Button className='w-full' size='md' type='submit' disabled={!ownerName || !ownerEmail}>
					Confirmar criação da viagem
				</Button>
			</form>

			<Loading show={loading} message='Aguarde...' />
		</div>
	)
}
