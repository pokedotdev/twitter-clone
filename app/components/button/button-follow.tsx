import { useFetcher } from '@remix-run/react'

import { Button } from '~/components'
import type { ButtonProps } from '~/components'
import type { UserProfileLoaderType } from '~/types/routes'

type ButtonFollowProps = {
	profile: UserProfileLoaderType['data']['profile']
} & ButtonProps

export const ButtonFollow = ({ profile, ...rest }: ButtonFollowProps) => {
	const fetcher = useFetcher()
	const isFollowed = profile.is_followed

	return (
		<fetcher.Form action="/forms/user" method="post">
			<input type="hidden" name="user" value={profile.id} />
			<input type="hidden" name="remove" value={`${isFollowed}`} />
			<Button
				name="action"
				value="follow"
				aria-label={`'Follow ${profile.username}`}
				variant={isFollowed ? 'ghost' : 'fill'}
				outline={isFollowed}
				{...rest}
			>
				{isFollowed ? 'Following' : 'Follow'}
			</Button>
		</fetcher.Form>
	)
}
