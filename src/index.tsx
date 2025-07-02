import { useState } from 'react'
import { toast } from 'sonner'
import { Container } from './components/Container'
import { FormAddParticipants } from './components/FormAddParticipants'
import { FormConfirmTripCreation } from './components/FormConfirmTripCreation'
import { FormCreateTrip } from './components/FormCreateTrip'
import { Logo } from './components/Logo'
import { Modal } from './components/Modal'
import { useTrip } from './hooks/useTrip'

export function HomePage() {
	const { date, destination } = useTrip()
	const [participantEmails, setParticipantEmails] = useState<string[]>([])
	const [newParticipantEmail, setNewParticipantEmail] = useState('')
	const [ownerName, setOwnerName] = useState('')
	const [ownerEmail, setOwnerEmail] = useState('')
	const [participantsModal, setParticipantsModal] = useState(false)
	const [confirmTripCreationModal, setConfirmTripCreationModal] = useState(false)

	function addParticipantEmail(newEmail: string) {
		if (participantEmails.includes(newEmail)) {
			toast.error('E-mail duplicado.')
		}

		if (newEmail) {
			setParticipantEmails([...participantEmails, newEmail])
			setNewParticipantEmail('')
			toast.success('E-mail adicionado.')
		}
	}

	function deleteParticipantEmail(emailToRemove: string) {
		setParticipantEmails(participantEmails.filter(participantEmail => participantEmail !== emailToRemove))
	}

	return (
		<>
			<Container className={participantsModal || confirmTripCreationModal ? 'blur' : ''}>
				<div className='relative flex flex-col gap-10 my-10 justify-center items-center sm:h-screen bg-squares bg-no-repeat bg-center'>
					<header className='text-center'>
						<Logo />
						<p className='text-lg'>Convide seus amigos e planeje sua próxima viagem!</p>
					</header>

					<div className='w-full max-w-[720px]'>
						<FormCreateTrip
							enableParticipantsInputOption
							participantEmails={participantEmails}
							setConfirmTripCreationModal={setConfirmTripCreationModal}
							setParticipantsModal={setParticipantsModal}
						/>
					</div>

					<p className='text-center text-sm text-zinc-500 [&_a]:text-zinc-300 [&_a]:underline max-w-[480px] [&_a]:transition [&>a:hover]:text-lime-300'>
						Ao planejar sua viagem pela plann.er você automaticamente concorda com nossos <a href=''>termos de uso</a> e{' '}
						<a href=''>políticas de privacidade</a>.
					</p>
				</div>
			</Container>

			{participantsModal && (
				<Modal
					title='Selecionar convidados'
					description='Os convidados irão receber um e-mail para confirmar a participação na viagem.'
					closeModal={setParticipantsModal}
				>
					<FormAddParticipants
						participantEmails={participantEmails}
						deleteParticipantEmail={deleteParticipantEmail}
						addParticipantEmail={addParticipantEmail}
						newParticipantEmail={newParticipantEmail}
						setNewParticipantEmail={setNewParticipantEmail}
					/>
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
					<FormConfirmTripCreation
						ownerName={ownerName}
						setOwnerName={setOwnerName}
						ownerEmail={ownerEmail}
						setOwnerEmail={setOwnerEmail}
						destination={destination}
						date={date}
						participantEmails={participantEmails}
					/>
				</Modal>
			)}
		</>
	)
}
