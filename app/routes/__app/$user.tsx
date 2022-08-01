import type { LoaderArgs, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Outlet } from '@remix-run/react'

import { getUserByUsername, getUserId } from '~/models/user.server'

export const meta: MetaFunction = ({ data }) => {
	if (!data?.user) return { title: 'Profile / Twitter' }
	return {
		title: `${data.user.name} (${data.user.username}) / Twitter`,
	}
}

export const loader = async ({ params, request }: LoaderArgs) => {
	if (!params.user) throw new Error('User not found')

	const ctx = {
		current_user_id: await getUserId(request),
	}

	const profile = await getUserByUsername(params.user, ctx)
	if (!profile) throw new Response('User not found', { status: 404 })

	return json({
		data: { profile },
		header: {
			title: profile.name,
			subtitle: profile.num_tweets + ' tweets',
		},
	})
}

export default function UserRoute() {
	return <Outlet />
}
