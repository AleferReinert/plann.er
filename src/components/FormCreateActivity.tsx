import { Calendar, Clock, Tag } from 'lucide-react'
import { Button } from './Button'
import { Input } from './Input'
import { InputGroupWrapper } from './InputGroupWrapper'

export function FormCreateActivity() {
	return (
		<form onSubmit={e => e.preventDefault()} className='space-y-3'>
			<InputGroupWrapper size='lg' theme='dark'>
				<Input placeholder='Qual a atividade?' icon={<Tag size={20} />} labelStyles='flex-1' required />
			</InputGroupWrapper>
			<div className='flex gap-2'>
				<InputGroupWrapper size='lg' theme='dark' className='w-auto flex-1'>
					<Input placeholder='Data' icon={<Calendar size={20} />} labelStyles='flex-1' required />
				</InputGroupWrapper>
				<InputGroupWrapper size='lg' theme='dark' className='w-36'>
					<Input placeholder='Horário' icon={<Clock size={20} />} required />
				</InputGroupWrapper>
			</div>
			<Button className='w-full' size='md'>
				Salvar atividade
			</Button>
		</form>
	)
}
