import { Link, useFetcher } from '~/remix'
import * as React from 'react'

import { Avatar, Button, Text } from '~/components'
import { getTimeSincePost, MS, useOptionalUser } from '~/utils'

export const useTimeAgo = (date: Date) => {
	const [time, setTime] = React.useState(Date.now())

	React.useEffect(() => {
		const diff = time - date.getTime()
		if (diff >= MS.HOUR) return
		const intervalId = setInterval(() => setTime(Date.now()), MS.MINUTE)
		return () => clearInterval(intervalId)
	}, [date, time])

	return getTimeSincePost(date)
}

const TimeAgo = (props: { date: Date }) => <>{useTimeAgo(props.date)}</>

export const Post = ({ post }: { post: any }) => {
	const user = useOptionalUser()
	const fetcher = useFetcher()

	const postLink = `/${post.user.username}/status/${post.id}`

	return (
		<article className="group relative flex cursor-pointer flex-col border-b border-gray-200 px-5 hover:bg-gray-50">
			<Link to={postLink} className="absolute inset-0 text-[0px]" aria-hidden="true">
				post
			</Link>
			{/* Reposted ? */}
			<div className="my-2 w-full" />
			{/* Posts */}
			<div className="flex gap-3.5">
				{/* Left */}
				<div className="flex-none">
					<Link to={`/${post.user.username}`} className="relative">
						<Avatar src={post.user.avatarUrl} alt={post.user.username} size="lg" />
					</Link>
				</div>
				{/* Right */}
				<div className="flex-1">
					<div className="flex justify-between">
						<div className="relative flex gap-2 text-lg">
							<Link to={`/${post.user.username}`} className="flex gap-2">
								<span className="font-bold hover:underline">{post.user.name}</span>
								<Text color="gray">{'@' + post.user.username}</Text>
							</Link>
							<Text color="gray">·</Text>
							<Link to={postLink}>
								<Text color="gray" className="hover:underline">
									<TimeAgo date={new Date(post.created_at)} />
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
							{post.body}
						</span>
					</div>

					{/* Stats */}
					<fetcher.Form
						action="/actions/post"
						method="post"
						className="my-1 flex justify-between text-gray-500"
					>
						<input type="hidden" name="post" value={post.id} />
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
						{/* Reposts */}
						<span className="flex-1">
							<Button className="relative" variant="ghost" color="green" icon="repost" disabled />
						</span>
						{/* Likes */}
						<span className="flex flex-1 items-center gap-1">
							<Button
								className="relative"
								type={user ? 'submit' : 'button'}
								name="action"
								value={post.is_liked ? 'unlike' : 'like'}
								variant="ghost"
								color="red"
								icon={post.is_liked ? 'like_fill' : 'like'}
								active={post.is_liked}
							/>
							{post.num_likes}
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
