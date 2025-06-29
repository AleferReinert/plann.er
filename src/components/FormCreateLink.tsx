import { Link2, Tag } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { api } from '../lib/axios'
import { Button } from './Button'
import { Input } from './Input'
import { InputGroupWrapper } from './InputGroupWrapper'
import { Loading } from './Loading'

interface FormCreateLinkProps {
	setCreateLinkModal: React.Dispatch<React.SetStateAction<boolean>>
}

export function FormCreateLink({ setCreateLinkModal }: FormCreateLinkProps) {
	const { tripId } = useParams()
	const [loading, setLoading] = useState(false)

	async function createLink(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const data = new FormData(e.currentTarget)
		const title = data.get('title')
		const url = data.get('url')

		if (!title) {
			toast.error('Insira um título.')
			document.getElementsByName('title')[0].focus()
			return
		}

		if (title.toString().length < 4) {
			toast.error('O título deve conter pelo menos 4 caracteres.')
			return
		}

		if (!url) {
			toast.error('Insira a URL.')
			document.getElementsByName('url')[0].focus()
			return
		}

		try {
			setLoading(true)
			await api.post(`/trips/${tripId}/links`, {
				title,
				url
			})
			toast.success('Link cadastrado com sucesso.', { duration: 1500 })
			setTimeout(() => {
				// window.document.location.reload()
				setCreateLinkModal(false)
			}, 1600)
		} catch (error) {
			toast.error('Erro: verifique o formato dos dados.')
			setLoading(false)
			console.error(error)
		}
	}

	return (
		<>
			<form onSubmit={createLink} className='space-y-3'>
				<InputGroupWrapper size='lg' theme='dark'>
					<Input placeholder='Título do link' icon={<Tag size={20} />} labelStyles='flex-1' required name='title' />
				</InputGroupWrapper>
				<InputGroupWrapper size='lg' theme='dark' className='w-auto flex-1'>
					<Input placeholder='URL' icon={<Link2 size={20} />} labelStyles='flex-1' required type='url' name='url' />
				</InputGroupWrapper>
				<Button className='w-full' size='md' type='submit'>
					Salvar link
				</Button>
			</form>
			<Loading show={loading} message='Cadastrando link...' />
		</>
	)
}
