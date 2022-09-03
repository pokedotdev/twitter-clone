import { useLoaderData, json, redirect } from '~/remix'
import type { LoaderArgs } from '~/remix'

import { TweetForm, TweetList } from '~/components'
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
				<>
					<TweetForm />
					<div className="my-[5px] h-0 border-b border-gray-200" />
				</>
			)}
			<TweetList list={data.tweets} />
		</div>
	)
}
