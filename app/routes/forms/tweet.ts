import type { ActionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'

import { createTweet } from '~/models/tweet.server'
import { getUserId } from '~/models/user.server'

export async function action({ request }: ActionArgs) {
	const userId = await getUserId(request)
	if (!userId) throw new Error('Not authenticated')

	const formData = await request.formData()
	const ctx = {
		current_user_id: userId,
	}

	switch (formData.get('action')) {
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
	}
}
