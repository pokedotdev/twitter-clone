import * as React from 'react'
import { Link, useFetcher } from '@remix-run/react'
import cn from 'clsx'

import { Avatar, ReplyDialog, Text } from '~/components'
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

type PostCardProps = {
	post: any
	border?: boolean
	threaded?: boolean
}

export const PostCard = ({ post, border = true, threaded = false }: PostCardProps) => {
	const user = useOptionalUser()
	const fetcher = useFetcher()

	const postLink = `/${post.user.username}/status/${post.id}`

	return (
		<article
			className={cn(
				'group relative flex cursor-pointer flex-col px-5 hover:bg-gray-50',
				border && 'border-b border-gray-200',
			)}
		>
			<Link to={postLink} className="absolute inset-0 text-[0px]" aria-hidden="true">
				post
			</Link>
			{/* Reposted ? */}
			<div className="my-1.5 w-full" />
			{/* Posts */}
			<div className="flex gap-3.5">
				{/* Left */}
				<div className="flex flex-none flex-col items-center">
					<Link to={`/${post.user.username}`} className="relative flex-none">
						<Avatar src={post.user.avatarUrl} alt={post.user.username} size="lg" />
					</Link>
					{threaded && <div className="relative top-1.5 z-10 w-0.5 flex-auto bg-gray-300" />}
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
						className="text-gray my-1 flex justify-between"
					>
						<input type="hidden" name="post" value={post.id} />
						{/* Comments */}
						<span className="-ml-3 flex-1">
							<ReplyDialog repliedTo={post.id} isOwn={post.user.username === user?.username}>
								<button
									className={`primary hover:text-$color relative flex flex-1 items-center gap-1 rounded-full pr-2`}
								>
									<span className="btn-icon i-comment ghost" />
									{post.num_replies || ''}
								</button>
							</ReplyDialog>
						</span>
						{/* Reposts */}
						<span className="flex-1">
							<button className="btn-icon i-repost ghost green" disabled />
						</span>
						{/* Likes */}
						<div className="flex-1">
							<button
								type={user ? 'submit' : 'button'}
								name="action"
								value={post.is_liked ? 'unlike' : 'like'}
								className={`rose hover:text-$color relative flex flex-1 items-center gap-1 rounded-full pr-2 ${
									post.is_liked ? 'text-$color' : ''
								}`}
							>
								<span
									className={`btn-icon ghost ${
										post.is_liked ? 'i-like_fill text-$color' : 'i-like'
									}`}
								/>
								{post.num_likes || ''}
							</button>
						</div>
						{/* Share */}
						<span className="flex-1">
							<button className="btn-icon i-share ghost primary" disabled />
						</span>
					</fetcher.Form>
				</div>
			</div>
		</article>
	)
}
