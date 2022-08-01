export const Theme = {
	color: {
		text: {
			default: 'text-gray-900',
			gray: 'text-gray-500',
			primary: 'text-primary-500',
			red: 'text-red-500',
			green: 'text-green-500',
			white: 'text-white',
		},
	},
	font: {
		weight: {
			4: 'font-regular',
			5: 'font-medium',
			6: 'font-semibold',
			7: 'font-bold',
			8: 'font-extrabold',
			9: 'font-black',
		},
	},
	sizes: {
		field: {
			sm: 'h-10',
			md: 'h-11',
			lg: 'h-14',
			xl: 'h-16',
		},
		padding: {
			sm: 'px-5',
			md: 'px-5',
			lg: 'px-5',
			xl: 'px-6',
		},
		square: {
			sm: 'h-4 w-4',
			md: 'h-11 w-11',
			lg: 'h-14 w-14',
			xl: 'h-16 w-16',
		},
		text: {
			sm: 'text-md',
			md: 'text-lg',
			lg: 'text-xl',
			xl: 'text-2xl',
		},
		icon: {
			sm: 'text-2xl',
			md: 'text-2xl',
			lg: 'text-2xl',
			xl: 'text-3xl',
		},
		gap: {
			sm: '',
			md: '',
			lg: '',
			xl: 'gap-2',
		},
	},
} as const
