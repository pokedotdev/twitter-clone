import type { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { client, e } from '~/db.server'

export const loader: LoaderFunction = async () => {
	const msg = await e.str('Hello World!').run(client)

	return { msg }
}

export default function Index() {
	const { msg } = useLoaderData()

	return <h1>{msg}</h1>
}
