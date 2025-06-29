import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HomePage } from '.'
import { TripProvider } from './contexts/TripContext'
import { TripDetailsPage } from './pages/detalhes-da-viagem'

const router = createBrowserRouter([
	{
		path: '/',
		element: <HomePage />
	},
	{
		path: '/detalhes-da-viagem/:tripId',
		element: <TripDetailsPage />
	}
])

export function App() {
	return (
		<TripProvider>
			<RouterProvider router={router} />
		</TripProvider>
	)
}

