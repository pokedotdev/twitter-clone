import { defineConfig, presetUno, presetIcons } from 'unocss'

const theme = presetUno().theme

export default defineConfig({
	theme: {
		colors: {
			gray: theme?.colors?.slate,
			primary: theme?.colors?.indigo,
		},
		breakpoints: {
			sm: '500px',
			md: '614px',
			mdl: '1002px',
			lg: '1024px',
			lgx: '1092px',
			xl: '1280px',
		},
	},
	preflights: [
		{
			getCSS: ({ theme }) => `
				.open-content { display: none; }
				.open[type=checkbox]:checked ~ .open-content { display: block; }
				`,
		},
	],
	presets: [presetUno(), presetIcons()],
})
