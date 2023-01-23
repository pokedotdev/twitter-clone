import type { ButtonProps } from '~/components'
import { Button } from '~/components'

type ButtonAuthProps = {
	provider: keyof typeof Providers
	redirectTo?: string
} & ButtonProps

export const ButtonProvider = ({ provider, redirectTo, ...props }: ButtonAuthProps) => {
	return (
		<Button {...props} icon={provider} name="provider" value={provider}>
			Sign in with {Providers[provider].displayName}
		</Button>
	)
}

const Providers = {
	github: {
		displayName: 'GitHub',
	},
}
