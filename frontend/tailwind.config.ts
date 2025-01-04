/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			borderWidth: {
				DEFAULT: '1px',
				0: '0',
				2: '2px',
				3: '3px',
				6: '6px',
			},
			gridTemplateRows: {
				8: 'repeat(8, minmax(0, 1fr))',
			},
			minWidth: {
				'2xl': '672px',
			},
			opacity: {
				60: '.60',
			},
			spacing: {
				18: '4.5em',
			},
			screens: {
				'3xl': '1800px',
				'4xl': '2000px',
				'5xl': '2200px',
			},
			zIndex: {
				2: '2',
				3: '3',
				4: '4',
				5: '5',
				6: '6',
				7: '7',
				8: '8',
				9: '9',
			},
		},
		borderWidth: {
			DEFAULT: '1px',
			0: '0',
			1: '1px',
			2: '2px',
			3: '3px',
			4: '4px',
			6: '6px',
			8: '8px',
		},
	},
	plugins: [],
};
