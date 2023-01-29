import { Link, useFetcher } from '~/remix'
import * as React from 'react'

import { Avatar, Button, Text } from '~/components'
import { getTimeSinceTweet, MS, useOptionalUser } from '~/utils'

export const useTimeAgo = (date: Date) => {
	const [time, setTime] = React.useState(Date.now())

	React.useEffect(() => {
		const diff = time - date.getTime()
		if (diff >= MS.HOUR) return
		const intervalId = setInterval(() => setTime(Date.now()), MS.MINUTE)
		return () => clearInterval(intervalId)
	}, [date, time])

	return getTimeSinceTweet(date)
}

const TimeAgo = (props: { date: Date }) => <>{useTimeAgo(props.date)}</>

export const Tweet = ({ tweet }: { tweet: any }) => {
	const user = useOptionalUser()
	const fetcher = useFetcher()

	const tweetLink = `/${tweet.user.username}/status/${tweet.id}`

	return (
		<article className="group relative flex cursor-pointer flex-col border-b border-gray-200 px-5 hover:bg-gray-50">
			<Link to={tweetLink} className="absolute inset-0 text-[0px]" aria-hidden="true">
				tweet
			</Link>
			{/* Retweeted ? */}
			<div className="my-2 w-full" />
			{/* Tweet */}
			<div className="flex gap-3.5">
				{/* Left */}
				<div className="flex-none">
					<Link to={`/${tweet.user.username}`} className="relative">
						<Avatar src={tweet.user.avatarUrl} alt={tweet.user.username} size="lg" />
					</Link>
				</div>
				{/* Right */}
				<div className="flex-1">
					<div className="flex justify-between">
						<div className="relative flex gap-2 text-lg">
							<Link to={`/${tweet.user.username}`} className="flex gap-2">
								<span className="font-bold hover:underline">{tweet.user.name}</span>
								<Text color="gray">{'@' + tweet.user.username}</Text>
							</Link>
							<Text color="gray">·</Text>
							<Link to={tweetLink}>
								<Text color="gray" className="hover:underline">
									<TimeAgo date={new Date(tweet.created_at)} />
								</Text>
							</Link>
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
						action="/actions/tweet"
						method="post"
						className="my-1 flex justify-between text-gray-500"
					>
						<input type="hidden" name="tweet" value={tweet.id} />
						{/* Comments */}
						<span className="-ml-1 flex-1">
							<Button
								className="relative"
								variant="ghost"
								color="primary"
								icon="comment"
								disabled
							/>
						</span>
						{/* Retweets */}
						<span className="flex-1">
							<Button className="relative" variant="ghost" color="green" icon="retweet" disabled />
						</span>
						{/* Likes */}
						<span className="flex flex-1 items-center gap-1">
							<Button
								className="relative"
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
							<Button className="relative" variant="ghost" color="primary" icon="share" disabled />
						</span>
					</fetcher.Form>
				</div>
			</div>
		</article>
	)
}
