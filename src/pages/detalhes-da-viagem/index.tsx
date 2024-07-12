import { Plus } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../../components/Button'
import { Container } from '../../components/Container'
import { FormCreateActivity } from '../../components/FormCreateActivity'
import { FormCreateLink } from '../../components/FormCreateLink'
import { FormCreateTrip } from '../../components/FormCreateTrip'
import { GeneralSchedule, GeneralScheduleProps } from '../../components/GeneralSchedule'
import { GuestList, GuestListProps } from '../../components/GuestList'
import { ImportantLinks, ImportantLinksProps } from '../../components/ImportantLinks'
import { Modal } from '../../components/Modal'

interface TripDetailsPageProps extends GeneralScheduleProps, ImportantLinksProps, GuestListProps {}

export function TripDetailsPage({ generalSchedule, links, guestList }: TripDetailsPageProps) {
	const [createActivityModal, setCreateActivityModal] = useState(false)
	const [createLinkModal, setCreateLinkModal] = useState(false)

	return (
		<>
			<Container className={createActivityModal || createLinkModal ? 'blur' : ''}>
				<div className='mt-8'>
					<FormCreateTrip />
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
						<GeneralSchedule generalSchedule={generalSchedule} />
					</div>
					<div className='w-80'>
						<div className='bg-zinc-800 h-[1px] my-6 md:hidden'></div>
						<ImportantLinks links={links} setCreateLinkModal={setCreateLinkModal} />
						<div className='bg-zinc-800 h-[1px] my-6'></div>
						<GuestList guestList={guestList} />
					</div>
				</div>
			</Container>

			{createActivityModal && (
				<Modal
					title='Cadastrar atividade'
					description='Todos convidados podem visualizar as atividades.'
					closeModal={setCreateActivityModal}
				>
					<FormCreateActivity />
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
