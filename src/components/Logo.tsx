import logo from '/img/logo.svg'

export function Logo() {
	return (
		<a href='/' className='inline-block mb-2'>
			<h1>
				<img src={logo} alt='plann.er' className='inline-block' width='157' height='33' fetchPriority='high' />
			</h1>
		</a>
	)
}
