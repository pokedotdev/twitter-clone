import type { LoaderArgs, MetaFunction } from '~/remix'
import { json, Outlet } from '~/remix'
import { notFound } from 'remix-utils'

import { getContext, getUserByUsername } from '~/models/user.server'

export const meta: MetaFunction = ({ data }) => {
	if (!data?.user) return { title: 'Profile / Twitter' }
	return {
		title: `${data.user.name} (${data.user.username}) / Twitter`,
	}
}

export const loader = async ({ params, request }: LoaderArgs) => {
	if (!params.user) throw notFound({ message: 'User not found' })

	const ctx = await getContext(request)

	const profile = await getUserByUsername(params.user, ctx)
	if (!profile) throw notFound({ message: 'User not found' })

	return json({
		profile,
		header: {
			title: profile.name,
			subtitle: profile.num_posts + ' posts',
		},
	})
}

export default function UserRoute() {
	return <Outlet />
}
