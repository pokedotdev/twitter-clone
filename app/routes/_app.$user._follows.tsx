import { Outlet } from '@remix-run/react'

import { Tabs } from '~/components'
import { useOptionalUser, useProfile } from '~/utils'

export default function FollowsLayout() {
	const user = useOptionalUser()
	const profile = useProfile()

	let tabs = [
		{ label: 'Followers', to: 'followers' },
		{ label: 'Following', to: 'following' },
	]

	if (user && !profile.is_own && profile.num_followers_you_know > 0)
		tabs.unshift({ label: 'Followers you know', to: 'followers_you_follow' })

	return (
		<div>
			<Tabs list={tabs} />
			<Outlet />
		</div>
	)
}
