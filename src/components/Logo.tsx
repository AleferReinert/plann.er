import logo from '/img/logo.svg'

export function Logo() {
	return (
		<h1 className='inline-block mb-2'>
			{/* @ts-expect-error react error */}
			<img src={logo} alt='plann.er' className='inline-block' width='157' height='33' fetchpriority='high' />
		</h1>
	)
}
