import type { LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'

import { authenticator } from '~/lib/auth.server'

export const loader: LoaderFunction = async ({ request, params }) => {
	const provider = params.provider?.toString()
	// TODO: add Error message if provider is not found
	if (!provider) return redirect('/explore')
	return authenticator.authenticate(provider, request, {
		successRedirect: '/home',
		failureRedirect: '/explore',
	})
}
