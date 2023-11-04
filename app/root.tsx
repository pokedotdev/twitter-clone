import type { MetaFunction } from '@remix-run/react'
import { Links, LiveReload, Meta, Scripts, ScrollRestoration, Outlet } from '@remix-run/react'
import type { LoaderFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'

import { getUser } from '~/models/user.server'

import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'

export const meta: MetaFunction = () => [{ title: 'Twitter Clone' }]

export const loader = async ({ request }: LoaderFunctionArgs) => {
	return json({
		user: await getUser(request),
	})
}

function Document({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				<Meta />
				<Links />
				{/*
          This removes anything added to html from extensions, causing hydration issue
          https://github.com/remix-run/remix/issues/4822
        */}
				<script
					dangerouslySetInnerHTML={{
						__html: `document.querySelectorAll("html > script").forEach((s) => s.parentNode?.removeChild(s));`,
					}}
				/>
			</head>
			<body className="bg-base text-base">
				{children}
				<ScrollRestoration />
				<LiveReload />
				<Scripts />
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
