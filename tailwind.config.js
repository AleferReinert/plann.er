/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			backgroundImage: {
				squares: 'url(/img/background.webp)'
			},
			fontFamily: {
				sans: 'Inter'
			}
		}
	},
	plugins: []
}

