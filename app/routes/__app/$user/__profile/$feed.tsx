import type { LoaderArgs } from '~/remix'
import { json, useLoaderData } from '~/remix'

import { TweetList } from '~/components'
import * as TweetModel from '~/models/tweet.server'
import * as UserModel from '~/models/user.server'

export async function loader({ params, request }: LoaderArgs) {
	let tweets: TweetModel.TweetCardFieldsType[] = []

	const { user: username, feed } = params
	if (!username) return json({ data: { tweets } })

	const ctx = {
		current_user_id: await UserModel.getUserId(request),
	}

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
