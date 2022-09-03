import { Outlet } from '~/remix'

import { Tabs } from '~/components'

export default function FollowsLayout() {
	let tabs = [
		{ label: 'Followers', to: 'followers' },
		{ label: 'Following', to: 'following' },
	]

	// TODO: add followers you are following
	// if (!profile.is_own)
	// 	tabs.unshift({ label: 'Followers you know', to: 'followers_you_follow' })

	return (
		<div>
			<Tabs list={tabs} />
			<Outlet />
		</div>
	)
}
