import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export const loader: LoaderFunction = async ({ params }) => {
	if (!params.user) throw new Error('User not found')
	return json({
		user: params.user,
	})
}

export default function Profile() {
	const data = useLoaderData()
	return (
		//
		<div className="text-5xl font-bold">@{data.user}</div>
	)
}
