import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { DayScheduleProps } from './components/ActivitiesList'
import { CreateTripPage } from './pages/criar-viagem'
import { TripDetailsPage } from './pages/detalhes-da-viagem'

const generalSchedule: DayScheduleProps[] = [
	{
		day: 17,
		dayOfTheWeek: 'sábado',
		activities: []
	},
	{
		day: 18,
		dayOfTheWeek: 'domingo',
		activities: [
			{
				completed: true,
				title: 'Corrida de Kart',
				hour: '14:00h'
			}
		]
	},
	{
		day: 19,
		dayOfTheWeek: 'segunda',
		activities: [
			{
				completed: true,
				title: 'Academia em grupo',
				hour: '08:00h'
			},
			{
				completed: true,
				title: 'Almoço',
				hour: '12:00h'
			},
			{
				completed: false,
				title: 'Gaming session',
				hour: '14:00h'
			}
		]
	}
]

const links = [
	{
		title: 'Reserva do AirBnB',
		url: 'https://www.airbnb.com.br/rooms/104700011'
	},
	{
		title: 'Regras da casa',
		url: 'https://www.notion.com/pages/1047000112354648336?adults'
	}
]

const participantList = [
	{
		name: 'Jessica White',
		email: 'jessica.white44@yahoo.com',
		confirmed: true
	},
	{
		name: 'Michael Brown',
		email: 'michael.brown77@gmail.com',
		confirmed: true
	},
	{
		name: 'Emily Davis',
		email: 'emily.davis55@hotmail.com',
		confirmed: false
	},
	{
		name: 'David Wilson',
		email: 'david.wilson33@outlook.com',
		confirmed: true
	},
	{
		name: 'Sarah Johnson',
		email: 'sarah.johnson88@yahoo.com',
		confirmed: false
	},
	{
		name: 'James Miller',
		email: 'james.miller22@gmail.com',
		confirmed: false
	},
	{
		name: 'Olivia Martinez',
		email: 'olivia.martinez99@hotmail.com',
		confirmed: false
	},
	{
		name: 'Daniel Anderson',
		email: 'daniel.anderson44@outlook.com',
		confirmed: false
	}
]

const router = createBrowserRouter([
	{
		path: '/',
		element: <CreateTripPage />
	},
	{
		path: '/detalhes-da-viagem/:tripId',
		element: (
			<TripDetailsPage generalSchedule={generalSchedule} links={links} participantList={participantList} />
		)
	}
])

export function App() {
	return <RouterProvider router={router} />
}

