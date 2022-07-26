import type { ActionArgs } from '~/remix'
import { redirect } from '~/remix'

import { authenticator } from '~/lib/auth.server'

export const loader = () => redirect('/login')

export const action = async ({ request }: ActionArgs) => {
	const form = await request.clone().formData()
	const provider = form.get('provider')?.toString()
	if (!provider) return redirect(request.url)

	return authenticator.authenticate(provider, request)
}
