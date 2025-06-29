import { createContext, useState } from 'react'
import { DateRange } from 'react-day-picker'

type TripContextType = {
	date: DateRange | undefined
	setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>
	destination: string
	setDestination: React.Dispatch<React.SetStateAction<string>>
}

export const TripContext = createContext({} as TripContextType)

export function TripProvider({ children }: { children: React.ReactNode }) {
	const [date, setDate] = useState<DateRange | undefined>()
	const [destination, setDestination] = useState('')

	return <TripContext.Provider value={{ date, setDate, destination, setDestination }}>{children}</TripContext.Provider>
}
