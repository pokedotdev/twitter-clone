import type { LinksFunction, LoaderArgs, V2_MetaFunction } from '~/remix'
import { json, Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '~/remix'
import reset from '@unocss/reset/tailwind.css'

import unocss from '~/styles/uno.css'
import { getUser } from '~/models/user.server'

export const links: LinksFunction = () => [
	{ rel: 'stylesheet', href: reset },
	{ rel: 'stylesheet', href: unocss },
]

export const meta: V2_MetaFunction = () => [{ title: 'Twitter Clone' }]

export const loader = async ({ request }: LoaderArgs) => {
	return json({
		user: await getUser(request),
	})
}

function Document({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body className="bg-base text-base">
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
						<a href="/" className="btn solid primary">
							Go to home
						</a>
						<a
							href="https://github.com/pokedotdev/twitter-clone"
							target="_blank"
							rel="noreferrer"
							className="btn solid dark pl-0"
						>
							<span className="icon i-github text-2xl" />
							See repo
						</a>
					</div>
				</div>
			</div>
		</Document>
	)
}
