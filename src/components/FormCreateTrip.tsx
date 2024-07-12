import { ArrowRight, Calendar, MapPin, Settings2, UserRoundPlus } from 'lucide-react'
import { useState } from 'react'
import { Button } from './Button'
import { Input } from './Input'
import { InputGroupWrapper } from './InputGroupWrapper'

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
	const [date, setDate] = useState('')
	const [showFullForm, setShowFullForm] = useState(false)

	function updateAddress(e: React.ChangeEvent<HTMLInputElement>) {
		setAddress(e.currentTarget.value)
	}

	function updateDate(e: React.ChangeEvent<HTMLInputElement>) {
		setDate(e.currentTarget.value)
	}

	async function changeData() {
		setShowFullForm(false)
		setAddress('')
		setDate('')
		setTimeout(() => {
			const addressInput = document.getElementById('address-input')?.focus()
			console.log(addressInput)
		}, 50)
	}

	return (
		<form onSubmit={e => e.preventDefault()}>
			<InputGroupWrapper size='lg'>
				<Input
					placeholder='Para onde você vai?'
					icon={<MapPin size={20} />}
					labelStyles='flex-1'
					onChange={e => updateAddress(e)}
					value={address}
					disabled={showFullForm || enableGuestsInputOption}
					id='address-input'
					required
				/>
				<Input
					placeholder='Quando?'
					icon={<Calendar size={20} />}
					inputStyles='md:max-w-36'
					onChange={e => updateDate(e)}
					value={date}
					disabled={showFullForm || enableGuestsInputOption}
					required
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
	)
}
