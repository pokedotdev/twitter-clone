import type { LinksFunction, LoaderArgs, MetaFunction } from '~/remix'
import { json, Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '~/remix'
import reset from '@unocss/reset/tailwind.css'

import unocss from '~/styles/uno.css'
import { getUser } from '~/models/user.server'
import { Button } from '~/components'

export const links: LinksFunction = () => {
	return [
		{ rel: 'stylesheet', href: reset },
		{ rel: 'stylesheet', href: unocss },
	]
}

export const meta: MetaFunction = () => ({
	charset: 'utf-8',
	title: 'Twitter Clone',
	viewport: 'width=device-width,initial-scale=1',
})

export const loader = async ({ request }: LoaderArgs) => {
	return json({
		data: { user: await getUser(request) },
	})
}

function Document({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	)
}

export default function App() {
	return (
		<Document>
			<Outlet />
		</Document>
	)
}

export function ErrorBoundary() {
	return (
		<Document>
			<div className="grid h-screen place-items-center">
				<div className="flex flex-col items-center gap-6">
					<h1 className="text-6xl font-bold">Oops :(</h1>
					<p className="text-2xl text-gray-500">an error has occurred on the server</p>
					<div className="flex gap-2">
						<a href="/">
							<Button as="div" variant="fill" color="primary">
								Go to home
							</Button>
						</a>
						<a href="https://github.com/pokedotdev/twitter-clone" target="_blank" rel="noreferrer">
							<Button as="div" icon="github">
								See repo
							</Button>
						</a>
					</div>
				</div>
			</div>
		</Document>
	)
}
