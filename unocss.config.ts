import { defineConfig, presetUno, presetIcons } from 'unocss'

const theme = presetUno().theme

export default defineConfig({
	shortcuts: {
		link: 'text-primary-500 hover:underline',
	},
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
	presets: [presetUno(), presetIcons()],
})
