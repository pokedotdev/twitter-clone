import cn from 'clsx'

import type { IconCollection } from '~/components'
import { Icon } from '~/components'
import { Theme } from '~/components/theme'

export type ButtonProps = {
	as?: React.ElementType
	icon?: IconCollection
	variant?: ButtonVariants
	color?: ButtonColors
	size?: keyof typeof Theme.sizes.field
	outline?: boolean
	square?: boolean
	active?: boolean
}

type PolymorphicProps<E extends React.ElementType> = ButtonProps &
	React.ComponentPropsWithoutRef<E>

const DEFAULT_ELEMENT = 'button'

export const Button = <E extends React.ElementType = typeof DEFAULT_ELEMENT>({
	as: Component = DEFAULT_ELEMENT,
	children,
	icon,
	size = 'md',
	variant = 'fill',
	color = 'default',
	outline = false,
	square = !children,
	active = false,
	className,
	...rest
}: PolymorphicProps<E>) => {
	const classes = cn(
		ButtonStyles.base,
		ButtonStyles.variant[variant].base,
		ButtonStyles.variant[variant][color],
		outline && ButtonStyles.outline,
		rest.disabled && ButtonStyles.disabled,

		square ? Theme.sizes.square[size] : Theme.sizes.field[size],
		active && Theme.color.text[color],
		Theme.sizes.text[size],
		icon && Theme.sizes.gap[size],
		className
	)

	return (
		<Component className={classes} {...rest}>
			{icon && (
				<span
					className={cn('grid place-items-center', Theme.sizes.square[size])}
				>
					<Icon name={icon} size={size} />
					{/* {icon} */}
				</span>
			)}
			{children && (
				<span className={cn(Theme.sizes.padding[size], icon && 'pl-0')}>
					{children}
				</span>
			)}
		</Component>
	)
}

export const ButtonStyles = {
	base: 'inline-flex justify-center items-center font-bold rounded-full',
	disabled: 'opacity-50 cursor-not-allowed',
	outline: 'border',
	variant: {
		ghost: {
			base: '',
			default: 'hover:bg-gray-500/10 border-gray-200',
			primary:
				'hover:bg-primary-500/10 hover:text-primary-500 border-primary-500',
			green: 'hover:bg-green-500/10 hover:text-emerald-500 border-emerald-500',
			red: 'hover:bg-rose-500/10 hover:text-rose-500 border-rose-500',
			white: 'hover:bg-white/10 hover:text-gray-500 border-gray-500',
		},
		fill: {
			base: '',
			default: 'bg-gray-900 hover:bg-gray-800 text-white',
			primary: 'bg-primary-500 hover:bg-primary-600 text-white',
			green: 'hover:bg-green-500/10 hover:text-emerald-500 border-emerald-500',
			red: 'hover:bg-rose-500/10 hover:text-rose-500 border-rose-500',
			white: 'bg-white hover:bg-gray-100 text-gray-900',
		},
	},
} as const

type ButtonVariants = keyof typeof ButtonStyles.variant
type ButtonColors = Exclude<
	keyof typeof ButtonStyles.variant[ButtonVariants],
	'base'
>
