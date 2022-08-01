import { useFetcher, useLoaderData } from '@remix-run/react'
import type { LoaderArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'

import { Avatar, Button, Tweets } from '~/components'
import { useOptionalUser, useUser } from '~/utils'
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
			{/* Create tweet */}
			{user && <TweetForm />}
			<Tweets list={data.tweets} />
		</div>
	)
}

const TweetForm = () => {
	const user = useUser()
	const fetcher = useFetcher()

	return (
		<div className="flex gap-3.5 border-b border-gray-200 px-5 py-3.5">
			<Avatar src={user.avatarUrl} alt={user.username} size="lg" />
			<fetcher.Form
				action="/forms/tweet"
				method="post"
				className="flex flex-auto flex-col gap-3.5"
			>
				<textarea
					name="body"
					placeholder="What's happening?"
					rows={1}
					className="resize-none border-b border-transparent py-3 text-2xl focus:border-gray-200 focus:outline-none"
				/>
				<div>
					<Button type="submit" color="primary" aria-label="Create tweet">
						Tweet
					</Button>
				</div>
			</fetcher.Form>
		</div>
	)
}
