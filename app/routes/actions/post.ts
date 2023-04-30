import type { ActionArgs } from '~/remix'
import { redirect } from '~/remix'
import { validationError } from 'remix-validated-form'
import { z } from 'zod'
import { zx } from 'zodix'
import { redirectBack } from 'remix-utils'

import { createPost, likePost } from '~/models/post.server'
import { getContextRequired } from '~/models/user.server'
import { PostFormValidator } from '~/components'

export async function loader() {
	return redirect('/')
}

export async function action({ request }: ActionArgs) {
	const formData = await request.formData()

	const createSchema = z.object({
		action: z.literal('create'),
	})
	const likeSchema = z.object({
		action: z.enum(['like', 'unlike']),
		post: z.string().uuid(),
	})
	const data = await zx.parseForm(
		formData,
		z.discriminatedUnion('action', [createSchema, likeSchema]),
	)

	const ctx = await getContextRequired(request)

	switch (data.action) {
		case 'create': {
			const fieldValues = await PostFormValidator.validate(formData)
			if (fieldValues.error) return validationError(fieldValues.error)
			const { body } = fieldValues.data
			await createPost({ body }, ctx)
			return redirectBack(request, { fallback: '/home' })
		}
		case 'like':
		case 'unlike': {
			await likePost({ id: data.post, remove: data.action === 'unlike' }, ctx)
			return redirectBack(request, { fallback: '/home' })
		}
	}
}
