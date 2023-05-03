type ButtonAuthProps = {
	provider: keyof typeof Providers
	redirectTo?: string
}

export const ButtonProvider = ({ provider, redirectTo, ...props }: ButtonAuthProps) => {
	const data = Providers[provider]
	return (
		<button className="btn solid light pl-0" {...props} name="provider" value={provider}>
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
