import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'

import { authenticator } from '~/lib/auth.server'

export const loader: LoaderFunction = () => redirect('/login')

export const action: ActionFunction = async ({ request }) => {
	const form = await request.clone().formData()
	const provider = form.get('provider')?.toString()
	if (!provider) return redirect(request.url)

	return authenticator.authenticate(provider, request)
}
