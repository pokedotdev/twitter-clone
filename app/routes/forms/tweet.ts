import type { ActionArgs } from '@remix-run/node'
import { redirect, json } from '@remix-run/node'
import { validationError } from 'remix-validated-form'

import { createTweet, likeTweet } from '~/models/tweet.server'
import { getUserId } from '~/models/user.server'
import { TweetFormValidator } from '~/components'

export async function loader() {
	return redirect('/')
}

export async function action({ request }: ActionArgs) {
	const userId = await getUserId(request)
	if (!userId) return null

	const formData = await request.formData()
	const ctx = {
		current_user_id: userId,
	}

	const action = formData.get('action')?.toString()
	switch (action) {
		case 'create': {
			const fieldValues = await TweetFormValidator.validate(formData)
			if (fieldValues.error) return validationError(fieldValues.error)
			const { body } = fieldValues.data
			const tweet = await createTweet(
				{
					body,
				},
				ctx
			)
			return json({ data: { tweet } })
		}
		case 'like':
		case 'unlike': {
			const tweetId = formData.get('tweet')?.toString()
			if (!tweetId) return null
			const tweet = await likeTweet(
				{ id: tweetId, remove: action === 'unlike' },
				ctx
			)
			return json({ data: { tweet } })
		}
	}

	return null
}
