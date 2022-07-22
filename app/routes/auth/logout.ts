import type { ActionArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'

import { authenticator } from '~/lib/auth.server'
import { safeRedirect } from '~/utils'

export const loader = () => redirect('/')

export const action = async ({ request }: ActionArgs) => {
	const form = await request.formData()
	const redirectTo = safeRedirect(form.get('redirectTo'), '/')
	await authenticator.logout(request, { redirectTo })
}
