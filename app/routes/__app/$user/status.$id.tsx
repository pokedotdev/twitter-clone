import type { LoaderArgs } from '~/remix'
import { useFetcher, Link, useLoaderData } from '~/remix'
import { badRequest, notFound } from 'remix-utils'

import { Avatar, Text, Button, Icon } from '~/components'
import { findTweetById } from '~/models/tweet.server'
import { getContext } from '~/models/user.server'
import { useOptionalUser } from '~/utils'

export async function loader({ request, params }: LoaderArgs) {
	if (!params.id) throw badRequest({ message: 'param ID required' })
	const ctx = await getContext(request)
	const tweet = await findTweetById({ id: params.id }, ctx)
	if (!tweet) throw notFound({ message: 'Tweet not found' })

	return { tweet }
}

export const handle = { header: { title: 'Tweet' } }

export default function TweetRoute() {
	const { tweet } = useLoaderData<typeof loader>()
	const user = useOptionalUser()
	const fetcher = useFetcher()

	return (
		<div>
			<article className="mt-3.5 px-5">
				<Link to={`/${tweet.user.username}`} className="flex gap-3.5">
					<Avatar src={tweet.user.avatarUrl} alt={tweet.user.username} size="lg" />
					<div className="flex flex-col justify-center text-lg leading-tight">
						<span className="font-bold hover:underline">{tweet.user.name}</span>
						<Text color="gray">{'@' + tweet.user.username}</Text>
					</div>
				</Link>
				{/* Content */}
				<div className="my-5">
					<span
						className="break-words text-[28px] leading-tight"
						style={{
							wordBreak: 'break-word',
							whiteSpace: 'pre-wrap',
						}}
					>
						{tweet.body}
					</span>
				</div>
				{/* info */}
				<div className="text-gray my-5 text-lg leading-tight">
					{new Date(tweet.created_at).toLocaleString('en-US', {
						hour: 'numeric',
						minute: '2-digit',
						hour12: true,
						year: 'numeric',
						month: 'long',
						day: 'numeric',
					})}
				</div>
				{/* stats */}
				{tweet.num_likes ? (
					<ul className="flex h-14 items-center border-t px-1.5 text-lg">
						<li>
							<strong>{tweet.num_likes}</strong> <span className="text-gray">Likes</span>
						</li>
					</ul>
				) : null}
				{/* actions */}
				<fetcher.Form
					action="/actions/tweet"
					method="post"
					className="flex h-14 items-center justify-around border-y text-gray-500"
				>
					<input type="hidden" name="tweet" value={tweet.id} />
					{/* Comments */}
					<Button variant="ghost" color="primary" square disabled>
						<Icon name="comment" size="lg" />
					</Button>
					{/* Retweets */}
					<Button variant="ghost" color="green" square disabled>
						<Icon name="retweet" size="lg" />
					</Button>
					{/* Likes */}
					<Button
						type={user ? 'submit' : 'button'}
						name="action"
						value={tweet.is_liked ? 'unlike' : 'like'}
						variant="ghost"
						color="red"
						square
						active={tweet.is_liked}
					>
						<Icon name={tweet.is_liked ? 'like_fill' : 'like'} size="lg" />
					</Button>
					{/* Share */}
					<Button variant="ghost" color="primary" square disabled>
						<Icon name="share" size="lg" />
					</Button>
				</fetcher.Form>
			</article>
			{/* reply form */}
			{/* replies */}
		</div>
	)
}
