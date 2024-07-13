import { format, setDefaultOptions } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRight, Calendar, MapPin, Settings2, UserRoundPlus } from 'lucide-react'
import { useState } from 'react'
import { DateRange, DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { Button } from './Button'
import { Input } from './Input'
import { InputGroupWrapper } from './InputGroupWrapper'
import { Modal } from './Modal'
setDefaultOptions({ locale: ptBR })

interface FormCreateTripProps {
	enableGuestsInputOption?: boolean
	setGuestsModal?: React.Dispatch<React.SetStateAction<boolean>>
	guestEmails?: string[]
	setConfirmTripCreationModal?: React.Dispatch<React.SetStateAction<boolean>>
}

export function FormCreateTrip({
	enableGuestsInputOption = false,
	setGuestsModal,
	guestEmails,
	setConfirmTripCreationModal
}: FormCreateTripProps) {
	const [address, setAddress] = useState('')
	const [date, setDate] = useState<DateRange | undefined>()
	const [showFullForm, setShowFullForm] = useState(false)
	const [daypickerModal, setDaypickerModal] = useState(false)
	const formatedDate = date?.from && date.to && format(date.from, "dd'/'MM' a '") + format(date.to, "dd'/'MM")

	function updateAddress(e: React.ChangeEvent<HTMLInputElement>) {
		setAddress(e.currentTarget.value)
	}

	// function updateDate(e: React.ChangeEvent<HTMLInputElement>) {
	// 	setDate(e.currentTarget.value)
	// }

	async function changeData() {
		setShowFullForm(false)
		setAddress('')
		setDate(undefined)
		setTimeout(() => {
			const addressInput = document.getElementById('address-input')?.focus()
			console.log(addressInput)
		}, 50)
	}

	return (
		<>
			<form onSubmit={e => e.preventDefault()}>
				<InputGroupWrapper size='lg'>
					<Input
						placeholder='Para onde você vai?'
						icon={<MapPin size={20} />}
						labelStyles='flex-1'
						onChange={e => updateAddress(e)}
						value={address}
						disabled={showFullForm}
						id='address-input'
						required
					/>
					<Input
						placeholder='Quando?'
						icon={<Calendar size={20} />}
						inputStyles='md:max-w-36'
						value={formatedDate}
						disabled={showFullForm}
						required
						onClick={() => setDaypickerModal(true)}
						onFocus={() => setDaypickerModal(true)}
					/>
					<div className='w-px h-6 bg-zinc-800 hidden md:block'></div>
					{(showFullForm || !enableGuestsInputOption) && (
						<Button variant='secondary' onClick={changeData}>
							Alterar local/data
							<Settings2 size={20} />
						</Button>
					)}

					{!showFullForm && enableGuestsInputOption && (
						<Button onClick={() => setShowFullForm(true)} disabled={!address || !date}>
							Continuar
							<ArrowRight size={20} />
						</Button>
					)}
				</InputGroupWrapper>

				{/* Aparece somente na home */}
				{showFullForm && guestEmails && setGuestsModal && setConfirmTripCreationModal && (
					<InputGroupWrapper size='lg' className='mt-4'>
						<Input
							placeholder={guestEmails.length === 0 ? 'Quem estará na viagem?' : ''}
							value={
								guestEmails.length === 1
									? '1 pessoa convidada'
									: guestEmails.length > 1
									? `${guestEmails.length} pessoas convidadas`
									: ''
							}
							icon={<UserRoundPlus size={20} />}
							labelStyles='flex-1'
							inputStyles='cursor-pointer'
							onClick={() => setGuestsModal(true)}
						/>
						<Button disabled={guestEmails.length === 0} onClick={() => setConfirmTripCreationModal(true)}>
							Confirmar viagem
							<ArrowRight size={20} />
						</Button>
					</InputGroupWrapper>
				)}
			</form>

			{daypickerModal && (
				<Modal
					title='Selecionar período'
					description='Defina o início e fim de sua viagem.'
					closeModal={setDaypickerModal}
					size='auto'
				>
					<div className='flex justify-center'>
						<DayPicker mode='range' selected={date} onSelect={setDate} />
					</div>
				</Modal>
			)}
		</>
	)
}
