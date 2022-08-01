import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { UserList } from '~/components'
import { getUserId, getUsers } from '~/models/user.server'

export async function loader({ request }: LoaderArgs) {
	const ctx = {
		current_user_id: await getUserId(request),
	}
	const users = await getUsers(ctx)
	return json({ data: { users } })
}

export default function LatestUsersRoute() {
	const { data } = useLoaderData<typeof loader>()

	return <UserList list={data.users} />
}
