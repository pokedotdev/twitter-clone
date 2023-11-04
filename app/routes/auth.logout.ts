import type { ActionFunctionArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { safeRedirect } from 'remix-utils/safe-redirect'

import { authenticator } from '~/lib/auth.server'

export const loader = () => redirect('/')

export const action = async ({ request }: ActionFunctionArgs) => {
	const { pathname } = new URL(request.headers.get('Referer') ?? '/')
	const redirectTo = safeRedirect(pathname)
	await authenticator.logout(request, { redirectTo })
}
