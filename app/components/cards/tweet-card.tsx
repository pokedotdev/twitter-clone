import { Link, useFetcher } from '@remix-run/react'

import { Avatar, Button, Text } from '~/components'
import { useOptionalUser } from '~/utils'

export const Tweet = ({ tweet }: { tweet: any }) => {
	const user = useOptionalUser()
	const fetcher = useFetcher()

	return (
		<div className="flex cursor-pointer flex-col border-b border-gray-200 px-5 hover:bg-gray-50">
			{/* Retweeted ? */}
			<div className="my-2 w-full" />
			{/* Tweet */}
			<div className="flex gap-[14px]">
				{/* Left */}
				<div className="flex-none">
					<Link to={`/${tweet.user.username}`}>
						<Avatar
							src={tweet.user.avatarUrl}
							alt={tweet.user.username}
							size="lg"
						/>
					</Link>
				</div>
				{/* Right */}
				<div className="flex-1">
					<div className="flex justify-between">
						<div className="flex gap-2 text-lg">
							<Link to={`/${tweet.user.username}`} className="flex gap-2">
								<span className="font-bold hover:underline">
									{tweet.user.name}
								</span>
								<Text color="gray">{'@' + tweet.user.username}</Text>
							</Link>
							<Text color="gray">·</Text>
							<Text color="gray" className="hover:underline">
								1h
							</Text>
						</div>
					</div>

					{/* Content */}
					<div>
						<span
							className="break-words text-lg"
							style={{
								wordBreak: 'break-word',
								whiteSpace: 'pre-wrap',
							}}
						>
							{tweet.body}
						</span>
					</div>

					{/* Stats */}
					<fetcher.Form
						action="/forms/tweet"
						method="post"
						className="my-1 flex justify-between text-gray-500"
					>
						<input type="hidden" name="tweet" value={tweet.id} />
						{/* Comments */}
						<span className="-ml-1 flex-1">
							<Button variant="ghost" color="primary" icon="comment" />
						</span>
						{/* Retweets */}
						<span className="flex-1">
							<Button variant="ghost" color="green" icon="retweet" />
						</span>
						{/* Likes */}
						<span className="flex flex-1 items-center gap-1">
							<Button
								type={user ? 'submit' : 'button'}
								name="action"
								value={tweet.is_liked ? 'unlike' : 'like'}
								variant="ghost"
								color="red"
								icon={tweet.is_liked ? 'like_fill' : 'like'}
								active={tweet.is_liked}
							/>
							{tweet.num_likes}
						</span>
						{/* Share */}
						<span className="flex-1">
							<Button variant="ghost" color="primary" icon="share" />
						</span>
					</fetcher.Form>
				</div>
			</div>
		</div>
	)
}
