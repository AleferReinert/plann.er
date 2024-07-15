import { format } from 'date-fns'
import { CircleCheck, CircleDashed } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../lib/axios'

interface Activity {
	date: string
	activities: {
		id: string
		title: string
		occurs_at: string
	}[]
}

export function ActivitiesList() {
	const { tripId } = useParams()
	const [activities, setActivities] = useState<Activity[]>([])

	useEffect(() => {
		api.get(`/trips/${tripId}/activities`).then(response => {
			setActivities(response.data.activities)
		})
	}, [tripId])

	return (
		<ul className='space-y-8'>
			{activities.map((activity, index) => (
				<li key={index}>
					<h3 className='text-zinc-300 font-semibold text-xl mb-3'>
						Dia {format(activity.date, 'd')}
						<span className='ml-2 text-zinc-500 font-normal text-xs'>{format(activity.date, 'EEEE')}</span>
					</h3>

					{activity.activities.length === 0 ? (
						<p className='text-zinc-500 text-sm'>Nenhuma atividade cadastrada nessa data.</p>
					) : (
						<ul className='space-y-3'>
							{activity.activities.map((activity, index) => (
								<li
									key={index}
									className='flex justify-between items-center gap-3 bg-zinc-900 rounded-xl px-4 py-3'
								>
									<div className='flex items-center gap-3'>
										{new Date(activity.occurs_at) < new Date() ? (
											<CircleCheck size={20} className='text-lime-300' />
										) : (
											<CircleDashed size={20} className='text-zinc-400' />
										)}
										{activity.title}
									</div>
									<div className='text-zinc-400 text-sm '>{format(activity.occurs_at, 'p')}h</div>
								</li>
							))}
						</ul>
					)}
				</li>
			))}
		</ul>
	)
}
