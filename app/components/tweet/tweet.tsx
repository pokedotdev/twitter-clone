import { Link } from '@remix-run/react'

import { Avatar, Button, Text } from '~/components'

export const Tweet = ({ tweet }: { tweet: any }) => {
	return (
		<div className="flex cursor-pointer flex-col border-b border-gray-200 px-5 hover:bg-gray-50">
			{/* Retweeted ? */}
			<div className="my-2 w-full" />
			{/* Tweet */}
			<div className="flex gap-[14px]">
				{/* Left */}
				<div>
					<Avatar
						src={tweet.user.avatarUrl}
						alt={tweet.user.username}
						size="lg"
					/>
				</div>
				{/* Right */}
				<div className="flex-1">
					<div className="flex justify-between">
						<div className="flex gap-2 text-lg">
							<Link to={`/${tweet.user.username}`} className="flex gap-2">
								<span className="font-bold hover:underline">
									{tweet.user.name}
								</span>
								<Text color="gray">{tweet.user.username}</Text>
							</Link>
							<Text color="gray">·</Text>
							<Text color="gray" className="hover:underline">
								1h
							</Text>
						</div>
					</div>

					{/* Content */}
					<div>
						<p className="text-lg">{tweet.body}</p>
					</div>

					{/* Stats */}
					<div className="my-1 flex justify-between text-gray-500">
						{/* Comments */}
						<span className="-ml-1 flex-1">
							<Button variant="ghost" color="primary" icon="comment" />
						</span>
						{/* Retweets */}
						<span className="flex-1">
							<Button variant="ghost" color="green" icon="retweet" />
						</span>
						{/* Likes */}
						<span className="flex-1">
							<Button variant="ghost" color="red" icon="like" />
							{tweet.num_likes}
						</span>
						{/* Share */}
						<span className="flex-1">
							<Button variant="ghost" color="primary" icon="share" />
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}
