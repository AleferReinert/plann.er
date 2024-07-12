import logo from '../assets/img/logo.svg'

export function Logo() {
	return (
		<a href='/' className='inline-block mb-2'>
			<h1>
				<img src={logo} alt='plann.er' className='inline-block h-8' />
			</h1>
		</a>
	)
}
