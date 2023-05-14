import type { V2_MetaFunction } from '~/remix'
import { Outlet } from '~/remix'

import { Tabs } from '~/components'

export const meta: V2_MetaFunction = () => [{ title: 'Explore' }]

export const handle = {
	header: {
		title: 'Explore',
	},
}

export default function Explore() {
	return (
		<div>
			<Tabs
				list={[
					{
						label: 'Latest Posts',
						to: '',
						end: true,
					},
					{
						label: 'Latest Users',
						to: 'latest_users',
					},
				]}
				className="sticky top-16 z-10"
			/>
			<Outlet />
		</div>
	)
}
