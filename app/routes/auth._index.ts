import type { ActionFunctionArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'

import { authenticator } from '~/lib/auth.server'

export const loader = () => redirect('/login')

export const action = async ({ request }: ActionFunctionArgs) => {
	const form = await request.clone().formData()
	const provider = form.get('provider')?.toString()
	if (!provider) return redirect(request.url)

	return authenticator.authenticate(provider, request)
}
