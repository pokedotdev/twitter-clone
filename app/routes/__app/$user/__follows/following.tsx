import type { LoaderArgs } from '~/remix'
import { json, useLoaderData } from '~/remix'

import { UserList } from '~/components'
import { getContext, getFollowings } from '~/models/user.server'

export async function loader({ request, params }: LoaderArgs) {
	if (!params.user) throw new Error('User not found')
	const ctx = await getContext(request)
	const users = await getFollowings({ username: params.user }, ctx)
	return json({ users })
}

export default function FollowersRoute() {
	const data = useLoaderData<typeof loader>()
	return <UserList list={data.users} />
}
