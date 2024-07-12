export interface DayScheduleProps {
	day: number
	dayOfTheWeek: string
	activities: {
		completed: boolean
		title: string
		hour: string
	}[]
}

export interface GeneralScheduleProps {
	generalSchedule: DayScheduleProps[]
}

// Cronograma - Lista de atividades
export function GeneralSchedule({ generalSchedule }: GeneralScheduleProps) {
	return (
		<ul className='space-y-8'>
			{generalSchedule.map((daySchedule, index) => (
				<li key={index}>
					<h3 className='text-zinc-300 font-semibold text-xl mb-3'>
						Dia {daySchedule.day}
						<span className='ml-2 text-zinc-500 font-normal text-xs'>{daySchedule.dayOfTheWeek}</span>
					</h3>

					{daySchedule.activities.length === 0 ? (
						<p className='text-zinc-500 text-sm'>Nenhuma atividade cadastrada nessa data.</p>
					) : (
						<ul className='space-y-3'>
							{daySchedule.activities.map((activity, index) => (
								<li
									key={index}
									className='flex justify-between items-center gap-3 bg-zinc-900 rounded-xl px-4 py-3'
								>
									<div>
										{activity.completed ? <span>yes</span> : <span>no</span>}
										{activity.title}
									</div>
									<div className='text-zinc-400 text-sm '>{activity.hour}</div>
								</li>
							))}
						</ul>
					)}
				</li>
			))}
		</ul>
	)
}
