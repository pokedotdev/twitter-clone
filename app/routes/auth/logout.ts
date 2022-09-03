import type { ActionArgs } from '~/remix'
import { redirect } from '~/remix'

import { authenticator } from '~/lib/auth.server'
import { safeRedirect } from '~/utils'

export const loader = () => redirect('/')

export const action = async ({ request }: ActionArgs) => {
	const form = await request.formData()
	const redirectTo = safeRedirect(form.get('redirectTo'), '/')
	await authenticator.logout(request, { redirectTo })
}
