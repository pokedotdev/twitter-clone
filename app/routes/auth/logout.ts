import type { ActionArgs } from '~/remix'
import { redirect } from '~/remix'
import { safeRedirect } from 'remix-utils'

import { authenticator } from '~/lib/auth.server'

export const loader = () => redirect('/')

export const action = async ({ request }: ActionArgs) => {
	const { pathname } = new URL(request.headers.get('Referer') ?? '/')
	const redirectTo = safeRedirect(pathname)
	await authenticator.logout(request, { redirectTo })
}
