import type { LoaderArgs } from '~/remix'
import { json, useLoaderData } from '~/remix'

import { TweetList } from '~/components'
import { getTweets } from '~/models/tweet.server'
import { getUserId } from '~/models/user.server'

export async function loader({ request }: LoaderArgs) {
	const ctx = {
		current_user_id: await getUserId(request),
	}
	const tweets = await getTweets(ctx)
	return json({ data: { tweets } })
}

export default function LatestUsersRoute() {
	const { data } = useLoaderData<typeof loader>()

	return <TweetList list={data.tweets} />
}
