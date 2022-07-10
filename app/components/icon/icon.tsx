import cn from 'clsx'

import type { IconCollection } from './icon.collection'
import { icons } from './icon.collection'

import { Theme } from '~/components/theme'

export type IconProps = {
	name: IconCollection
	size?: keyof typeof Theme.sizes.icon
} & React.ComponentProps<'div'>

export const Icon = ({ name, size, className, ...rest }: IconProps) => {
	const classes = cn(
		name && icons[name],
		size && Theme.sizes.icon[size],
		className
	)
	return <div className={classes} {...rest} />
}
