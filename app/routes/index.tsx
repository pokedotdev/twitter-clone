import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { getUsers } from '~/models/user.server'

type LoaderData = {
	users: Awaited<ReturnType<typeof getUsers>>
}

export const loader: LoaderFunction = async () => {
	const users = await getUsers()
	return json({ users })
}

export default function Index() {
	const { users } = useLoaderData<LoaderData>()

	return (
		<>
			<h1>All Users:</h1>
			<ul>
				{users.map(({ id, username, tweets }) => (
					<li key={id}>
						User: @{username}
						<ul>
							{tweets.map(({ id, body }) => (
								<li key={id}>{body}</li>
							))}
						</ul>
					</li>
				))}
			</ul>
		</>
	)
}
