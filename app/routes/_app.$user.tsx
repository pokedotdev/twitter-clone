import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Outlet } from '@remix-run/react'

import { getContext, getUserByUsername } from '~/models/user.server'

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	const title = data?.profile ? `${data.profile.name} (@${data.profile.username})` : 'Profile'
	return [{ title }]
}

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
	if (!params.user) throw json({ message: 'User not found' }, 404)

	const ctx = await getContext(request)

	const profile = await getUserByUsername(params.user, ctx)
	if (!profile) throw json({ message: 'User not found' }, 404)

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
