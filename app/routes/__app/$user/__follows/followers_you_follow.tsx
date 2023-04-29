import type { LoaderArgs } from '~/remix'
import { json, useLoaderData } from '~/remix'

import { UserList } from '~/components'
import { getContext, getFollowersYouKnow } from '~/models/user.server'

export async function loader({ request, params }: LoaderArgs) {
	if (!params.user) throw new Error('User not found')
	const ctx = await getContext(request)
	const users = await getFollowersYouKnow({ username: params.user }, ctx)
	return json({ users })
}

export default function FollowersYouFollowRoute() {
	const data = useLoaderData<typeof loader>()
	return <UserList list={data.users} />
}
