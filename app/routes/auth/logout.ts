import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'

import { authenticator } from '~/lib/auth.server'

export const loader: LoaderFunction = () => redirect('/')

export const action: ActionFunction = async ({ request }) => {
	await authenticator.logout(request, { redirectTo: request.url })
}
