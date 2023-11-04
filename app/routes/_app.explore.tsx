import type { MetaFunction } from '@remix-run/node'
import { Outlet } from '@remix-run/react'

import { Tabs } from '~/components'

export const meta: MetaFunction = () => [{ title: 'Explore' }]

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
				className="sticky top-16 z-20"
			/>
			<Outlet />
		</div>
	)
}
