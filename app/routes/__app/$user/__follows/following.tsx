import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { UserList } from '~/components'
import { getFollowings, getUserId } from '~/models/user.server'

export async function loader({ request, params }: LoaderArgs) {
	if (!params.user) throw new Error('User not found')
	const ctx = {
		current_user_id: await getUserId(request),
	}
	const users = await getFollowings({ username: params.user }, ctx)
	return json({ data: { users } })
}

export default function FollowersRoute() {
	const { data } = useLoaderData<typeof loader>()
	return <UserList list={data.users} />
}
