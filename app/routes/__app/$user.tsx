import type {
	ActionFunction,
	LoaderFunction,
	MetaFunction,
} from '@remix-run/node'
import { json } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'

import { Button, Text } from '~/components'
import { authenticator } from '~/lib/auth.server'
import { getUserByUsername } from '~/models/user.server'

export const action: ActionFunction = async ({ request }) => {
	await authenticator.logout(request, {
		redirectTo: request.url,
	})
}

export const meta: MetaFunction = ({ data }) => {
	if (!data?.user) return { title: 'Profile / Twitter' }
	return {
		title: `${data.user.name} (${data.user.username}) / Twitter`,
	}
}

export const loader: LoaderFunction = async ({ params }) => {
	if (!params.user) throw new Error('User not found')
	const profile = await getUserByUsername(params.user)
	if (!profile) {
		return json({
			user: {
				id: '0',
				username: params.user,
				name: params.user,
			},
		})
	}
	return json({
		profile,
	})
}

export default function UserRoute() {
	// const { profile } = useLoaderData<LoaderData>()
	return <Outlet />
}
