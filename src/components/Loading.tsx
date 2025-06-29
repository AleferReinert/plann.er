interface LoadingProps {
	show: boolean
	message?: string
}

export function Loading({ show, message }: LoadingProps) {
	return (
		<div
			className={`
				${show ? 'opacity-100 ' : 'opacity-0 pointer-events-none '}
				bg-zinc-950/95 fixed inset-0 z-50 transition flex flex-col gap-4 justify-center items-center
		`}
		>
			<p className='text-lime-300 text-lg'>{message || 'Aguarde...'}</p>
			<div className='border-zinc-700 h-16 w-16 animate-spin rounded-full border-2 border-t-lime-300' />
		</div>
	)
}
