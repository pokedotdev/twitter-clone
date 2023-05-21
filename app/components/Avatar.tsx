import cn from 'clsx'

type AvatarProps = {
	src?: string | null
	size?: keyof typeof AvatarStyles.size
} & Omit<React.ComponentProps<'img'>, 'src'>

const DEFAULT_AVATAR = '/images/avatar.svg'

export const Avatar = ({ src, alt, size = 'md', className, ...rest }: AvatarProps) => {
	src ||= DEFAULT_AVATAR
	const classes = cn(
		AvatarStyles.base,
		AvatarStyles.size[size],
		className,
		//
	)
	return <img src={src} alt={alt && `@${alt} avatar`} className={classes} {...rest} />
}

const AvatarStyles = {
	base: 'rounded-full',
	size: {
		xs: 'w-5 h-5',
		sm: 'w-9.5 h-9.5',
		md: 'w-12 h-12',
		lg: 'w-14.5 h-14.5',
		xl: 'w-33 h-33',
	},
}
