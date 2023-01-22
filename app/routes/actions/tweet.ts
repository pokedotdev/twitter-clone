import type { ActionArgs } from '~/remix'
import { redirect } from '~/remix'
import { validationError } from 'remix-validated-form'
import { z } from 'zod'
import { zx } from 'zodix'
import { redirectBack } from 'remix-utils'

import { createTweet, likeTweet } from '~/models/tweet.server'
import { getContextRequired } from '~/models/user.server'
import { TweetFormValidator } from '~/components'

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
		tweet: z.string().uuid(),
	})
	const data = await zx.parseForm(
		formData,
		z.discriminatedUnion('action', [createSchema, likeSchema])
	)

	const ctx = await getContextRequired(request)

	switch (data.action) {
		case 'create': {
			const fieldValues = await TweetFormValidator.validate(formData)
			if (fieldValues.error) return validationError(fieldValues.error)
			const { body } = fieldValues.data
			await createTweet({ body }, ctx)
			return redirectBack(request, { fallback: '/home' })
		}
		case 'like':
		case 'unlike': {
			await likeTweet({ id: data.tweet, remove: data.action === 'unlike' }, ctx)
			return redirectBack(request, { fallback: '/home' })
		}
	}
}
