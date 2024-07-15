// Modal que aparece ao clicar no botão "Confirmar viagem" na homepage
import { Mail, User } from 'lucide-react'
import { Button } from './Button'
import { Input } from './Input'
import { InputGroupWrapper } from './InputGroupWrapper'

interface FormConfirmTripCreationProps {
	ownerName: string
	setOwnerName: React.Dispatch<React.SetStateAction<string>>
	ownerEmail: string
	setOwnerEmail: React.Dispatch<React.SetStateAction<string>>
	createTrip(): Promise<void>
}
export function FormConfirmTripCreation({
	ownerName,
	setOwnerName,
	ownerEmail,
	setOwnerEmail,
	createTrip
}: FormConfirmTripCreationProps) {
	return (
		<div>
			<div className='space-y-3'>
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
					<Input
						placeholder='Seu e-mail pessoal'
						value={ownerEmail}
						onChange={e => setOwnerEmail(e.target.value)}
						icon={<Mail size={20} />}
						type='email'
						required
					/>
				</InputGroupWrapper>
				<Button className='w-full' size='md' onClick={createTrip}>
					Confirmar criação da viagem
				</Button>
			</div>
		</div>
	)
}
