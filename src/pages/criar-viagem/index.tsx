import { useState } from 'react'
import { Container } from '../../components/Container'
import { FormConfirmTripCreation } from '../../components/FormConfirmTripCreation'
import { FormCreateTrip } from '../../components/FormCreateTrip'
import { FormGuests } from '../../components/FormGuests'
import { Logo } from '../../components/Logo'
import { Modal } from '../../components/Modal'

export function CreateTripPage() {
	const [guestEmails, setGuestEmails] = useState<string[]>([])
	const [guestsModal, setGuestsModal] = useState(false)
	const [confirmTripCreationModal, setConfirmTripCreationModal] = useState(false)

	return (
		<>
			<Container className={guestsModal || confirmTripCreationModal ? 'blur' : ''}>
				<div className='flex flex-col gap-10 my-10 justify-center items-center sm:h-screen bg-squares bg-no-repeat bg-center'>
					<header className='text-center'>
						<Logo />
						<p className='text-lg'>Convide seus amigos e planeje sua próxima viagem!</p>
					</header>

					<div className='w-full max-w-[720px]'>
						<FormCreateTrip
							enableGuestsInputOption
							guestEmails={guestEmails}
							setConfirmTripCreationModal={setConfirmTripCreationModal}
							setGuestsModal={setGuestsModal}
						/>
					</div>

					<p className='text-center text-sm text-zinc-500 [&_a]:text-zinc-300 [&_a]:underline max-w-[480px]'>
						Ao planejar sua viagem pela plann.er você automaticamente concorda com nossos{' '}
						<a href=''>termos de uso</a> e <a href=''>políticas de privacidade</a>.
					</p>
				</div>
			</Container>

			{guestsModal && (
				<Modal
					title='Selecionar convidados'
					description='Os convidados irão receber um e-mail para confirmar a participação na viagem.'
					closeModal={setGuestsModal}
				>
					<FormGuests guestEmails={guestEmails} setGuestEmails={setGuestEmails} />
				</Modal>
			)}

			{confirmTripCreationModal && (
				<Modal
					title='Confirmar criação da viagem'
					description={
						<>
							Para concluir a criação da viagem para
							<strong className='text-zinc-100'> Florianópolis, Brasil </strong>
							nas datas de
							<strong className='text-zinc-100'> 16 a 27 de Agosto de 2024 </strong>
							preencha seus dados abaixo:
						</>
					}
					closeModal={setConfirmTripCreationModal}
				>
					<FormConfirmTripCreation />
				</Modal>
			)}
		</>
	)
}
