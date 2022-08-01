import type { ActionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'

import { createTweet, likeTweet } from '~/models/tweet.server'
import { getUserId } from '~/models/user.server'

export async function action({ request }: ActionArgs) {
	const userId = await getUserId(request)
	if (!userId) throw new Error('Not authenticated')

	const formData = await request.formData()
	const ctx = {
		current_user_id: userId,
	}

	const action = formData.get('action')?.toString()
	switch (action) {
		case 'create': {
			const body = formData.get('body')?.toString()
			if (!body) return null
			const tweet = await createTweet(
				{
					body,
					tweet_type: 'TWEET',
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
