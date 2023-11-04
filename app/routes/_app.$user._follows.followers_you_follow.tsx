import type { LoaderFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { UserList } from '~/components'
import { getContext, getFollowersYouKnow } from '~/models/user.server'

export async function loader({ request, params }: LoaderFunctionArgs) {
	if (!params.user) throw new Error('User not found')
	const ctx = await getContext(request)
	const users = await getFollowersYouKnow({ username: params.user }, ctx)
	return json({ users })
}

export default function FollowersYouFollowRoute() {
	const data = useLoaderData<typeof loader>()
	return <UserList list={data.users} />
}
