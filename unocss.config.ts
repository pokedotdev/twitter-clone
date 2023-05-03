import { defineConfig, presetUno, presetIcons, transformerVariantGroup } from 'unocss'
import { colord } from 'colord'

const preset = presetUno()
const theme = preset.theme!
const themeColors: any = theme.colors!
const colors = {
	...themeColors,
	gray: themeColors.slate,
	primary: themeColors.indigo,
}

export const icons = {
	logo: 'i-teenyicons-twitter-solid',
	home: 'i-ph-house',
	home_fill: 'i-ph-house-fill',
	hash: 'i-ph-hash',
	hash_fill: 'i-ph-hash-bold',
	user: 'i-ph-user',
	user_fill: 'i-ph-user-fill',
	dots: 'i-ph-dots-three-bold',
	message: 'i-ph-envelope',
	location: 'i-ph-map-pin',
	link: 'i-ph-link',
	calendar: 'i-ph-calendar-blank',
	comment: 'i-ph-chat-centered',
	repost: 'i-ph-repeat',
	repost_fill: 'i-ph-repeat-bold ',
	like: 'i-ph-heart',
	like_fill: 'i-ph-heart-fill',
	share: 'i-ph-share',
	arrow_left: 'i-ph-arrow-left',
	search: 'i-ph-magnifying-glass',
	pen: 'i-ph-pen-nib',
	close: 'i-ph-x',
	// Logos
	github: 'i-line-md-github-loop',
} as const

const iconsWithPrefix = Object.fromEntries(
	Object.entries(icons).map(([k, v]) => [`i-${k}`, `before:${v}`]),
)

export default defineConfig({
	shortcuts: [
		iconsWithPrefix,
		{
			// ...iconList,
			'bg-base': 'bg-white',
			'bg-border': 'bg-gray-200',

			// text colors
			'text-base': 'text-gray-900',
			'text-gray': 'text-gray-500',
			'text-subtle': 'text-gray-400',

			// border
			'border-base': 'border-gray-200',

			// components
			icon: 'grid place-items-center square before:content-[""] text-2xl',
			btn: `
				inline-flex justify-center items-center border-(~ transparent) rounded-full h-11 px-5 text-lg font-bold
				disabled:(opacity-50 cursor-not-allowed)
				[&>.icon]:(h-inherit)
			`,
			'btn-icon': 'btn icon',
			// style variants
			solid: 'bg-$color text-$color-contrast hover:(bg-$color-active)',
			outline: `border-base hover:(border-$color-fade text-$color)`,
			ghost: 'hover:(text-$color bg-$color-fade)',

			// utils
			'flex-center': 'flex items-center justify-center',
			'grid-center': 'grid place-items-center',
			'absolute-center': 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
			square: 'aspect-square !p-0',
			link: 'text-primary-500 hover:underline',
		},
	],
	rules: [
		// color variants
		[
			/^(.+)$/,
			([_, key]) => {
				let color = colors[key]
				if (!color || typeof color === 'string') return
				if (key === 'light') color = { 500: colors.white, 600: colors.gray[100] }
				if (key === 'dark') color = { 500: colors.gray[900], 600: colors.gray[800] }
				const base = colord(color[500])
				return {
					'--color': base.toHex(),
					'--color-contrast': base.isDark() ? colors.white : colors.gray[900],
					'--color-active': color[600],
					'--color-light': base.alpha(0.5).toRgbString(),
					'--color-fade': base.alpha(0.1).toRgbString(),
				}
			},
			{ autocomplete: '($colors|light|dark)', layer: 'base' },
		],
	],
	theme: {
		colors: colors,
		breakpoints: {
			sm: '500px',
			md: '614px',
			mdl: '1002px',
			lg: '1024px',
			lgx: '1092px',
			xl: '1280px',
		},
	},
	presets: [preset, presetIcons()],
	transformers: [transformerVariantGroup()],
})
