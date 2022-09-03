import type { LoaderArgs } from '~/remix'
import { json, useLoaderData } from '~/remix'

import { UserList } from '~/components'
import { getFollowers, getUserId } from '~/models/user.server'

export async function loader({ request, params }: LoaderArgs) {
	if (!params.user) throw new Error('User not found')
	const ctx = {
		current_user_id: await getUserId(request),
	}
	const users = await getFollowers({ username: params.user }, ctx)
	return json({ data: { users } })
}

export default function FollowersRoute() {
	const { data } = useLoaderData<typeof loader>()
	return <UserList list={data.users} />
}
