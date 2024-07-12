import { Link2, Tag } from 'lucide-react'
import { Button } from './Button'
import { Input } from './Input'
import { InputGroupWrapper } from './InputGroupWrapper'

interface FormCreateLinkProps {
	setCreateLinkModal: React.Dispatch<React.SetStateAction<boolean>>
}

export function FormCreateLink({ setCreateLinkModal }: FormCreateLinkProps) {
	function formSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setCreateLinkModal(true)
	}

	return (
		<form onSubmit={e => formSubmit(e)} className='space-y-3'>
			<InputGroupWrapper size='lg' theme='dark'>
				<Input placeholder='Título do link' icon={<Tag size={20} />} labelStyles='flex-1' required />
			</InputGroupWrapper>
			<InputGroupWrapper size='lg' theme='dark' className='w-auto flex-1'>
				<Input placeholder='URL' icon={<Link2 size={20} />} labelStyles='flex-1' required />
			</InputGroupWrapper>
			<Button className='w-full' size='md' type='submit'>
				Salvar link
			</Button>
		</form>
	)
}
