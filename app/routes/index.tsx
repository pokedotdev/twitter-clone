import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { getUsers } from '~/models/user.server'

export const loader = async (_: LoaderArgs) => {
	const users = await getUsers()
	return json({ users })
}

export default function Index() {
	const { users } = useLoaderData<typeof loader>()

	return (
		<div className="my-8 mx-auto max-w-2xl">
			<h1 className="my-4 font-bold">All Users:</h1>
			<ul>
				{users.map(({ id, username, tweets }) => (
					<li key={id}>
						<div className="flex items-center gap-2">
							<div className="i-ph:user" />@{username}
						</div>
						<ul className="list-decimal pl-8">
							{tweets.map(({ id, body }) => (
								<li key={id}>{body}</li>
							))}
						</ul>
					</li>
				))}
			</ul>
		</div>
	)
}
