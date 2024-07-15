import { format } from 'date-fns'
import { Calendar, Clock, Tag } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { api } from '../lib/axios'
import { Button } from './Button'
import { Input } from './Input'
import { InputGroupWrapper } from './InputGroupWrapper'

interface FormCreateActivityProps {
	setCreateActivityModal: React.Dispatch<React.SetStateAction<boolean>>
	finalDate: string
}

export function FormCreateActivity({ setCreateActivityModal, finalDate }: FormCreateActivityProps) {
	const { tripId } = useParams()

	function getCurrentDate() {
		const today = new Date()
		const year = today.getFullYear()
		const month = String(today.getMonth() + 1).padStart(2, '0')
		const day = String(today.getDate()).padStart(2, '0')
		return `${year}-${month}-${day}`
	}

	async function createActivity(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		const data = new FormData(e.currentTarget)
		const activityTitle = data.get('activity-title')?.toString()
		const activityDate = data.get('activity-date')?.toString()
		const activityHour = data.get('activity-hour')?.toString()
		const datetime = `${activityDate}T${activityHour}`
		const currentDate = format(new Date(), 'yyyy-MM-dd')
		const currentHour = format(new Date(), 'HH:mm')
		const isCurrentDate = activityDate === currentDate
		const isLessThanStartDate = new Date(datetime) < new Date()
		const isGreaterThanEndDate = new Date(datetime) > new Date(finalDate)
		const isInvalidHour = activityHour! < currentHour

		if (isCurrentDate && isInvalidHour) {
			toast.error('Horário inválido: escolha um horário futuro.')
			return
		}

		if (isLessThanStartDate) {
			toast.error('Data inválida: escolha uma data futura.')
			return
		}
		if (isGreaterThanEndDate) {
			toast.error('Data inválida: ultrapassou o limite do cronograma da viagem.')
			return
		}

		await api.post(`/trips/${tripId}/activities`, {
			title: activityTitle,
			occurs_at: datetime
		})

		setCreateActivityModal(false)
		toast.success('Atividade cadastrada com sucesso.', {
			duration: 2000
		})
		setTimeout(() => window.document.location.reload(), 2100)
	}

	return (
		<form onSubmit={createActivity} className='space-y-3'>
			<InputGroupWrapper size='lg' theme='dark'>
				<Input
					placeholder='Qual a atividade?'
					icon={<Tag size={20} />}
					labelStyles='flex-1'
					required
					name='activity-title'
					min='4'
				/>
			</InputGroupWrapper>
			<div className='flex gap-2'>
				<InputGroupWrapper size='lg' theme='dark'>
					<Input
						placeholder='Data'
						icon={<Calendar size={20} />}
						labelStyles='flex-1'
						required
						name='activity-date'
						onFocus={e => (e.target.type = 'date')}
						min={getCurrentDate()}
						max={finalDate}
					/>
				</InputGroupWrapper>
				<InputGroupWrapper size='lg' theme='dark' className='max-w-36'>
					<Input
						placeholder='Horário'
						icon={<Clock size={20} />}
						required
						name='activity-hour'
						onFocus={e => (e.target.type = 'time')}
					/>
				</InputGroupWrapper>
			</div>
			<Button className='w-full' size='md' type='submit'>
				Salvar atividade
			</Button>
		</form>
	)
}
