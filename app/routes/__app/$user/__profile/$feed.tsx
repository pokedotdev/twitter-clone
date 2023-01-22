import type { LoaderArgs } from '~/remix'
import { json, useLoaderData } from '~/remix'

import { getContext } from '~/models/user.server'
import * as TweetModel from '~/models/tweet.server'
import { TweetList } from '~/components'

export async function loader({ params, request }: LoaderArgs) {
	let tweets: TweetModel.TweetCardFieldsType[] = []

	const { user: username, feed } = params
	if (!username) return json({ data: { tweets } })

	const ctx = await getContext(request)

	if (feed === undefined)
		tweets = await TweetModel.getUserTweets({ username }, ctx)
	else if (feed === 'with_replies') tweets = []
	else if (feed === 'media') tweets = []
	else if (feed === 'likes')
		tweets = await TweetModel.getUserLikedTweets({ username }, ctx)

	return json({ data: { tweets } })
}

export default function UserFeedRoute() {
	const { data } = useLoaderData<typeof loader>()

	return <TweetList list={data.tweets} />
}
