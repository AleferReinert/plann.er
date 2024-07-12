import { Mail, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from './Button'
import { Input } from './Input'
import { InputGroupWrapper } from './InputGroupWrapper'

// Modal que aparece ao clicar no botão "Confirmar viagem" na homepage
export function FormConfirmTripCreation() {
	const navigate = useNavigate()

	function formSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		navigate('/detalhes-da-viagem/12')
	}

	return (
		<div>
			<form className='space-y-3' onSubmit={e => formSubmit(e)}>
				<InputGroupWrapper theme='dark'>
					<Input placeholder='Seu nome completo' icon={<User size={20} />} type='text' autoFocus required />
				</InputGroupWrapper>
				<InputGroupWrapper theme='dark'>
					<Input placeholder='Seu e-mail pessoal' icon={<Mail size={20} />} type='email' required />
				</InputGroupWrapper>
				<Button className='w-full' size='md' type='submit'>
					Confirmar criação da viagem
				</Button>
			</form>
		</div>
	)
}
