import type { LoaderFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { UserList } from '~/components'
import { getUserId, getUsers } from '~/models/user.server'

export async function loader({ request }: LoaderFunctionArgs) {
	const users = await getUsers({
		current_user_id: await getUserId(request),
	})
	return json({ users })
}

export default function LatestUsersRoute() {
	const data = useLoaderData<typeof loader>()

	return <UserList list={data.users} />
}
