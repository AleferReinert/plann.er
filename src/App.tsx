import { ArrowRight, Calendar, MapPin, Settings2, UserRoundPlus } from 'lucide-react'
import { useState } from 'react'
import { Button } from './components/Button'
import { Container } from './components/Container'
import { FormGuests } from './components/FormGuests'
import { Input } from './components/Input'
import { InputGroupWrapper } from './components/InputGroupWrapper'
import { Logo } from './components/Logo'
import { Modal } from './components/Modal'

// const emails = [
// 	'jessica.white44@yahoo.com',
// 	'erik_leffler3@gmail.com',
// 	'rebekah.conn21@gmail.com',
// 	'rebekah.conn21@gmail.com',
// 	'rebekah.conn21@gmail.com',
// 	'emile.mayer25@yahoo.com'
// ]

export function App() {
	const [fullForm, setFullForm] = useState(false)
	const [address, setAddress] = useState('')
	const [date, setDate] = useState('')
	const [guestEmails, setGuestEmails] = useState<string[]>([])
	const [guestsModal, setGuestsModal] = useState(false)

	function updateAddress(e: React.ChangeEvent<HTMLInputElement>) {
		setAddress(e.currentTarget.value)
	}

	function updateDate(e: React.ChangeEvent<HTMLInputElement>) {
		setDate(e.currentTarget.value)
	}

	function clearForm() {
		setFullForm(false)
		setAddress('')
		setDate('')
	}

	function showFullForm() {
		setFullForm(true)
	}

	function formSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
	}

	return (
		<>
			<Container className={guestsModal ? 'blur' : ''}>
				<div className='flex flex-col gap-10 my-10 justify-center text-center items-center sm:h-screen bg-squares bg-no-repeat bg-center'>
					<header className=''>
						<Logo />
						<p className='text-lg'>Convide seus amigos e planeje sua próxima viagem!</p>
					</header>

					<form className='space-y-4 w-full max-w-[720px]' onSubmit={e => formSubmit(e)}>
						<InputGroupWrapper>
							<Input
								placeholder='Para onde você vai?'
								icon={<MapPin size={20} />}
								labelStyles='flex-1'
								onChange={e => updateAddress(e)}
								disabled={fullForm}
								value={address}
								required
							/>
							<Input
								placeholder='Quando?'
								icon={<Calendar size={20} />}
								inputStyles='md:max-w-36'
								onChange={e => updateDate(e)}
								disabled={fullForm}
								value={date}
								required
							/>
							<div className='w-px h-6 bg-zinc-800 hidden md:block'></div>
							{fullForm ? (
								<Button variant='secondary' onClick={clearForm}>
									Alterar local/data
									<Settings2 size={20} />
								</Button>
							) : (
								<Button onClick={showFullForm} disabled={!address || !date}>
									Continuar
									<ArrowRight size={20} />
								</Button>
							)}
						</InputGroupWrapper>

						{fullForm && (
							<InputGroupWrapper>
								<Input
									placeholder={
										guestEmails.length > 0
											? `${guestEmails.length} pessoa(s) convidada(s)`
											: `Quem estará na viagem?`
									}
									icon={<UserRoundPlus size={20} />}
									labelStyles='flex-1'
									onClick={() => setGuestsModal(true)}
								/>
								<Button disabled={!address || !date || !guestEmails}>
									Confirmar viagem
									<ArrowRight size={20} />
								</Button>
							</InputGroupWrapper>
						)}
					</form>

					<p className='text-sm text-zinc-500 [&_a]:text-zinc-300 [&_a]:underline max-w-[480px]'>
						Ao planejar sua viagem pela plann.er você automaticamente concorda com nossos{' '}
						<a href=''>termos de uso</a> e <a href=''>políticas de privacidade</a>.
					</p>
				</div>
			</Container>
			{guestsModal && (
				<Modal
					title='Selecionar convidados'
					description='Os convidados irão receber um e-mail para confirmar a participação na viagem.'
					setGuestsModal={setGuestsModal}
				>
					<FormGuests guestEmails={guestEmails} setGuestEmails={setGuestEmails} />
				</Modal>
			)}
		</>
	)
}

