import cn from 'clsx'

import { Theme } from '~/components/theme'

export type TextProps = {
	as?: React.ElementType
	size?: keyof typeof Theme.sizes.text
	color?: keyof typeof Theme.color.text
	weight?: keyof typeof Theme.font.weight
} & React.ComponentPropsWithoutRef<'span'>

export const Text = ({
	as: Component = 'span',
	children,
	size = 'md',
	color,
	weight,
	className,
}: TextProps) => {
	const classes = cn(
		Theme.sizes.text[size],
		color && Theme.color.text[color],
		weight && Theme.font.weight[weight],
		className,
	)
	return <Component className={classes}>{children}</Component>
}
