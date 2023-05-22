type ButtonAuthProps = {
	provider: keyof typeof Providers
	redirectTo?: string
	className?: string
}

export const ButtonProvider = ({ provider, redirectTo, className, ...rest }: ButtonAuthProps) => {
	const data = Providers[provider]
	return (
		<button
			className={className || 'btn solid light pl-0'}
			{...rest}
			name="provider"
			value={provider}
		>
			<span className={`icon ${data.icon}`} />
			Sign in with {data.displayName}
		</button>
	)
}

const Providers = {
	github: {
		displayName: 'GitHub',
		icon: 'i-github',
	},
}
