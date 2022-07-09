import type { LoaderFunction } from '@remix-run/node'
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
