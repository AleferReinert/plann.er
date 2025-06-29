import { format, setDefaultOptions } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRight, Calendar, MapPin, Settings2, UserRoundPlus } from 'lucide-react'
import { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { useTrip } from '../hooks/useTrip'
import { Button } from './Button'
import { Input } from './Input'
import { InputGroupWrapper } from './InputGroupWrapper'
import { Modal } from './Modal'
setDefaultOptions({ locale: ptBR })

interface FormCreateTripProps {
	enableParticipantsInputOption?: boolean
	setParticipantsModal?: React.Dispatch<React.SetStateAction<boolean>>
	participantEmails?: string[]
	setConfirmTripCreationModal?: React.Dispatch<React.SetStateAction<boolean>>
}

export function FormCreateTrip({
	enableParticipantsInputOption = false,
	setParticipantsModal,
	participantEmails,
	setConfirmTripCreationModal
}: FormCreateTripProps) {
	const { date, destination, setDate, setDestination } = useTrip()
	const [showFullForm, setShowFullForm] = useState(false)
	const [daypickerModal, setDaypickerModal] = useState(false)
	const formatedDate = date?.from && date.to && format(date.from, "dd'/'MM' a '") + format(date.to, "dd'/'MM")
	const tomorrow = new Date(Date.now() + 86400000)

	function changeData() {
		setShowFullForm(false)
		setDestination('')
		setDate(undefined)
	}

	return (
		<>
			<InputGroupWrapper size='lg' className='transition focus-within:border-zinc-700'>
				<Input
					placeholder='Para onde você vai?'
					icon={<MapPin size={20} />}
					labelStyles='flex-1'
					onChange={e => setDestination(e.target.value)}
					value={destination}
					disabled={showFullForm}
					id='destination-input'
					required
				/>
				<Input
					placeholder='Quando?'
					icon={<Calendar size={20} />}
					inputStyles='md:max-w-36'
					defaultValue={formatedDate}
					disabled={showFullForm}
					onClick={() => setDaypickerModal(true)}
					onFocus={() => setDaypickerModal(true)}
				/>
				<div className='w-px h-6 bg-zinc-800 hidden md:block'></div>
				{(showFullForm || !enableParticipantsInputOption) && (
					<Button variant='secondary' onClick={changeData} type='button'>
						Alterar local/data
						<Settings2 size={20} />
					</Button>
				)}

				{!showFullForm && enableParticipantsInputOption && (
					<Button onClick={() => setShowFullForm(true)} disabled={!destination || !date}>
						Continuar
						<ArrowRight size={20} />
					</Button>
				)}
			</InputGroupWrapper>

			{/* Aparece somente na home */}
			{showFullForm && participantEmails && setParticipantsModal && setConfirmTripCreationModal && (
				<InputGroupWrapper size='lg' className='mt-4'>
					<Input
						placeholder={participantEmails.length === 0 ? 'Quem estará na viagem?' : ''}
						defaultValue={
							participantEmails.length === 1
								? '1 pessoa convidada'
								: participantEmails.length > 1
								? `${participantEmails.length} pessoas convidadas`
								: ''
						}
						icon={<UserRoundPlus size={20} />}
						labelStyles='flex-1'
						inputStyles='cursor-pointer'
						onClick={() => setParticipantsModal(true)}
					/>
					<Button
						disabled={participantEmails.length === 0}
						onClick={() => setConfirmTripCreationModal(true)}
						type='button'
					>
						Confirmar viagem
						<ArrowRight size={20} />
					</Button>
				</InputGroupWrapper>
			)}

			{daypickerModal && (
				<Modal
					title='Selecionar período'
					description='Defina o início e fim de sua viagem.'
					closeModal={setDaypickerModal}
					size='auto'
				>
					<div className='flex justify-center'>
						<DayPicker mode='range' selected={date} onSelect={setDate} disabled={{ before: tomorrow }} />
					</div>
				</Modal>
			)}
		</>
	)
}
