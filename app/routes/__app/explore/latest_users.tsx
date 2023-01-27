import type { LoaderArgs } from '~/remix'
import { json, useLoaderData } from '~/remix'

import { UserList } from '~/components'
import { getUserId, getUsers } from '~/models/user.server'

export async function loader({ request }: LoaderArgs) {
	const users = await getUsers({
		current_user_id: await getUserId(request),
	})
	return json({ users })
}

export default function LatestUsersRoute() {
	const data = useLoaderData<typeof loader>()

	return <UserList list={data.users} />
}
