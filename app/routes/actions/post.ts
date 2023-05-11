import type { ActionArgs } from '~/remix'
import { json, redirect } from '~/remix'
import { z } from 'zod'
import { zx } from 'zodix'
import { redirectBack } from 'remix-utils'

import { createPost, likePost } from '~/models/post.server'
import { getContextRequired } from '~/models/user.server'
import { postFormSchema } from '~/components'

export async function loader() {
	return redirect('/')
}

const createSchema = postFormSchema.extend({
	action: z.literal('create'),
})
const likeSchema = z.object({
	action: z.enum(['like', 'unlike']),
	post: z.string().uuid(),
})
const formSchema = z.discriminatedUnion('action', [createSchema, likeSchema])

export async function action({ request }: ActionArgs) {
	const formData = await request.formData()
	const data = await zx.parseForm(formData, formSchema)
	const ctx = await getContextRequired(request)

	switch (data.action) {
		case 'create': {
			try {
				await createPost({ body: data.body }, ctx)
			} catch (_) {
				return json(
					{ form: { error: 'Whoops! You already said that.' }, value: { body: data.body } },
					{ status: 409 },
				)
			}
			return redirectBack(request, { fallback: '/home' })
		}
		case 'like':
		case 'unlike': {
			await likePost({ id: data.post, remove: data.action === 'unlike' }, ctx)
			return redirectBack(request, { fallback: '/home' })
		}
	}
}
