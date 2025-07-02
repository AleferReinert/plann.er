import { DateRange } from 'react-day-picker'
import { NavigateFunction } from 'react-router-dom'
import { toast } from 'sonner'
import { api } from '../lib/axios'

interface CreateTripProps {
	destination: string
	date: DateRange | undefined
	participantEmails: string[]
	ownerName: string
	ownerEmail: string
	setLoading: React.Dispatch<React.SetStateAction<boolean>>
	navigate: NavigateFunction
}

export async function createTrip({
	destination,
	date,
	participantEmails,
	ownerName,
	ownerEmail,
	setLoading,
	navigate
}: CreateTripProps) {
	if (!destination) {
		toast.error('Destino inválido.')
		return
	}

	if (!date?.from || !date.to) {
		toast.error('Data inválida.')
		return
	}

	if (participantEmails.length === 0) {
		toast.error('Nenhum convidado adicionado.')
		return
	}

	if (!ownerName) {
		toast.error('Preencha seu nome.')
		return
	}

	if (!ownerEmail) {
		toast.error('Preencha seu e-mail.')
		return
	}

	setLoading(true)
	const response = await api.post('/trips', {
		destination,
		starts_at: date.from,
		ends_at: date.to,
		emails_to_invite: participantEmails,
		owner_name: ownerName,
		owner_email: ownerEmail
	})

	const { tripId } = response.data
	navigate(`/detalhes-da-viagem/${tripId}`)
}
