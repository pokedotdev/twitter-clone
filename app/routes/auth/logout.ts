import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'

import { authenticator } from '~/lib/auth.server'
import { safeRedirect } from '~/utils'

export const loader: LoaderFunction = () => redirect('/')

export const action: ActionFunction = async ({ request }) => {
	const form = await request.formData()
	const redirectTo = safeRedirect(form.get('redirectTo'), '/')
	await authenticator.logout(request, { redirectTo })
}
