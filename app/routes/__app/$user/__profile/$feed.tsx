import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { Tweets } from '~/components'
import * as TweetModel from '~/models/tweet.server'
import { getUserId } from '~/models/user.server'

export async function loader({ params, request }: LoaderArgs) {
	let tweets: TweetModel.TweetsType = []

	const { user: username, feed } = params
	if (!username) return json({ tweets })

	const ctx = {
		current_user_id: await getUserId(request),
	}

	if (feed === undefined)
		tweets = await TweetModel.getUserTweets({ username }, ctx)
	else if (feed === 'with_replies') tweets = []
	else if (feed === 'media') tweets = []
	else if (feed === 'likes')
		tweets = await TweetModel.getUserLikedTweets({ username }, ctx)

	return json({ tweets })
}

export default function UserFeedRoute() {
	const data = useLoaderData<typeof loader>()

	return <Tweets list={data.tweets} />
}
