import type { LinksFunction, LoaderArgs, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react'
import reset from '@unocss/reset/tailwind.css'

import unocss from '~/styles/uno.css'
import { getUser } from '~/models/user.server'

export const links: LinksFunction = () => {
	return [
		{ rel: 'stylesheet', href: reset },
		{ rel: 'stylesheet', href: unocss },
	]
}

export const meta: MetaFunction = () => ({
	charset: 'utf-8',
	title: 'New Remix App',
	viewport: 'width=device-width,initial-scale=1',
})

export const loader = async ({ request }: LoaderArgs) => {
	return json({
		data: { user: await getUser(request) },
	})
}

export default function App() {
	return (
		<html lang="en">
			<head>
				<Meta />
				<Links />
			</head>
			<body>
				<Outlet />
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	)
}
