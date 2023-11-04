import type { LoaderFunctionArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'

import { authenticator } from '~/lib/auth.server'

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
	const provider = params.provider?.toString()
	// TODO: add Error message if provider is not found
	if (!provider) return redirect('/explore')
	return authenticator.authenticate(provider, request, {
		successRedirect: '/home',
		failureRedirect: '/explore',
	})
}
