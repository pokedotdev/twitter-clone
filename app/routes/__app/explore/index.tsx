import type { LoaderArgs } from '~/remix'
import { json, useLoaderData } from '~/remix'

import { TweetList } from '~/components'
import { getTweets } from '~/models/tweet.server'
import { getContext } from '~/models/user.server'

export async function loader({ request }: LoaderArgs) {
	const ctx = await getContext(request)
	const tweets = await getTweets(ctx)
	return json({ tweets })
}

export default function LatestTweetsRoute() {
	const data = useLoaderData<typeof loader>()

	return <TweetList list={data.tweets} />
}
