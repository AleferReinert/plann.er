import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { useParams } from 'react-router-dom'
import { ActivitiesList } from '../../components/ActivitiesList'
import { Button } from '../../components/Button'
import { Container } from '../../components/Container'
import { FormCreateActivity } from '../../components/FormCreateActivity'
import { FormCreateLink } from '../../components/FormCreateLink'
import { FormCreateTrip } from '../../components/FormCreateTrip'
import { ImportantLinks } from '../../components/ImportantLinks'
import { Modal } from '../../components/Modal'
import { ParticipantsList } from '../../components/ParticipantsList'
import { api } from '../../lib/axios'

interface TripDetailsPageProps {
	setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>
	setDestination: React.Dispatch<React.SetStateAction<string>>
}

interface Trip {
	destination: string
	ends_at: string
	id: string
	is_confirmed: boolean
	starts_at: string
}

export function TripDetailsPage({ setDate, setDestination }: TripDetailsPageProps) {
	const [createActivityModal, setCreateActivityModal] = useState(false)
	const [createLinkModal, setCreateLinkModal] = useState(false)
	const { tripId } = useParams()
	const [trip, setTrip] = useState<Trip | undefined>()
	const finalDate =
		(trip && new Date(new Date(trip.ends_at).setHours(23, 59)).toString()) || new Date().toString()

	useEffect(() => {
		api.get(`/trips/${tripId}`).then(response => {
			setTrip(response.data.trip)
		})
	}, [tripId])

	function stringToDate() {
		if (trip) {
			return { from: new Date(trip?.starts_at), to: new Date(trip?.ends_at) }
		}
	}

	return (
		<>
			<Container className={createActivityModal || createLinkModal ? 'blur' : ''}>
				<div className='mt-8'>
					<FormCreateTrip
						date={stringToDate()}
						destination={trip?.destination}
						setDate={setDate}
						setDestination={setDestination}
					/>
				</div>

				<div className='pt-8 md:flex md:gap-6 lg:gap-16 mb-10'>
					<div className='flex-1'>
						<div className='sm:flex justify-between mb-6 sm:mb-0'>
							<h1 className='text-zinc-50 text-3xl font-semibold mb-6'>Atividades</h1>
							<Button className='w-full sm:w-auto' onClick={() => setCreateActivityModal(true)}>
								<Plus size={20} />
								Cadastrar atividade
							</Button>
						</div>
						<ActivitiesList />
					</div>
					<div className='w-80'>
						<div className='bg-zinc-800 h-[1px] my-6 md:hidden'></div>
						<ImportantLinks setCreateLinkModal={setCreateLinkModal} />
						<div className='bg-zinc-800 h-[1px] my-6'></div>
						<ParticipantsList />
					</div>
				</div>
			</Container>

			{createActivityModal && (
				<Modal
					title='Cadastrar atividade'
					description='Todos convidados podem visualizar as atividades.'
					closeModal={setCreateActivityModal}
				>
					<FormCreateActivity setCreateActivityModal={setCreateActivityModal} finalDate={finalDate} />
				</Modal>
			)}

			{createLinkModal && (
				<Modal
					title='Cadastrar link'
					description='Todos convidados podem visualizar os links importantes.'
					closeModal={setCreateLinkModal}
				>
					<FormCreateLink setCreateLinkModal={setCreateLinkModal} />
				</Modal>
			)}
		</>
	)
}
