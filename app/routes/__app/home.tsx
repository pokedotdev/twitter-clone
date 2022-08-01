import { useLoaderData } from '@remix-run/react'
import type { LoaderArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'

import { TweetForm, Tweets } from '~/components'
import { useOptionalUser } from '~/utils'
import { getUserId } from '~/models/user.server'
import { getHomeTweets } from '~/models/tweet.server'

export async function loader({ request }: LoaderArgs) {
	const userId = await getUserId(request)
	if (!userId) return redirect('/explore')
	const ctx = {
		current_user_id: userId,
	}
	const tweets = await getHomeTweets(ctx)
	return json({
		data: { tweets },
	})
}

export const handle = {
	header: {
		title: 'Home',
	},
}

export default function Home() {
	const user = useOptionalUser()
	const { data } = useLoaderData<typeof loader>()

	return (
		<div>
			{user && (
				<div className=" border-b border-gray-200 ">
					<TweetForm />
				</div>
			)}
			<Tweets list={data.tweets} />
		</div>
	)
}
