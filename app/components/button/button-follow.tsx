import { useFetcher } from '~/remix'

import type { UserProfileLoaderType } from '~/types/routes'
import { useOptionalUser } from '~/utils'

type ButtonFollowProps = {
	profile: UserProfileLoaderType['profile']
	onClick?: React.ComponentProps<'button'>['onClick']
}

export const ButtonFollow = ({ profile, ...rest }: ButtonFollowProps) => {
	const user = useOptionalUser()
	const fetcher = useFetcher()
	const isFollowed = profile.is_followed

	return profile.is_own ? null : (
		<fetcher.Form action="/actions/user" method="post">
			<input type="hidden" name="userId" value={profile.id} />
			<input type="hidden" name="remove" value={`${isFollowed}`} />
			<button
				type={user ? 'submit' : 'button'}
				name="action"
				value="follow"
				aria-label={`'Follow ${profile.username}`}
				className={`btn dark ${isFollowed ? 'ghost' : 'solid'} ${
					isFollowed ? 'hover:red outline' : ''
				} group relative`}
				{...rest}
			>
				{isFollowed ? (
					<>
						<span className="visible group-hover:invisible">Following</span>
						<span className="group-hover:flex-center absolute inset-0 hidden">Unfollow</span>
					</>
				) : (
					'Follow'
				)}
			</button>
		</fetcher.Form>
	)
}
