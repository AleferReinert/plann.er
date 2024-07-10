/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			backgroundImage: {
				squares: 'url(./src/assets/img/background.png)'
			},
			fontFamily: {
				sans: 'Inter'
			}
		}
	},
	plugins: []
}

