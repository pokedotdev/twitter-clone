import type { ActionArgs, LoaderArgs } from '~/remix'
import { redirect } from '~/remix'
import { z } from 'zod'
import { zx } from 'zodix'
import { redirectBack } from 'remix-utils'

import { followUser, getContextRequired } from '~/models/user.server'

export async function loader(_: LoaderArgs) {
	return redirect('/')
}

export async function action({ request }: ActionArgs) {
	const followSchema = z.object({
		action: z.literal('follow'),
		userId: z.string().uuid(),
		remove: zx.BoolAsString,
	})
	const data = await zx.parseForm(request, z.discriminatedUnion('action', [followSchema]))

	switch (data.action) {
		case 'follow': {
			const ctx = await getContextRequired(request)
			const { userId, remove } = data
			await followUser({ id: userId, remove }, ctx)
			return redirectBack(request, { fallback: '/' })
		}
	}
}
