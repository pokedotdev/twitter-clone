import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

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
