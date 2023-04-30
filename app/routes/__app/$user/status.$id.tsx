import type { LoaderArgs } from '~/remix'
import { useFetcher, Link, useLoaderData } from '~/remix'
import { badRequest, notFound } from 'remix-utils'

import { Avatar, Text, Button, Icon } from '~/components'
import { findPostById } from '~/models/post.server'
import { getContext } from '~/models/user.server'
import { useOptionalUser } from '~/utils'

export async function loader({ request, params }: LoaderArgs) {
	if (!params.id) throw badRequest({ message: 'param ID required' })
	const ctx = await getContext(request)
	const post = await findPostById({ id: params.id }, ctx)
	if (!post) throw notFound({ message: 'Post not found' })

	return { post }
}

export const handle = { header: { title: 'Post' } }

export default function PostRoute() {
	const { post } = useLoaderData<typeof loader>()
	const user = useOptionalUser()
	const fetcher = useFetcher()

	return (
		<div>
			<article className="mt-3.5 px-5">
				<Link to={`/${post.user.username}`} className="flex gap-3.5">
					<Avatar src={post.user.avatarUrl} alt={post.user.username} size="lg" />
					<div className="flex flex-col justify-center text-lg leading-tight">
						<span className="font-bold hover:underline">{post.user.name}</span>
						<Text color="gray">{'@' + post.user.username}</Text>
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
						{post.body}
					</span>
				</div>
				{/* info */}
				<div className="text-gray my-5 text-lg leading-tight">
					{new Date(post.created_at).toLocaleString('en-US', {
						hour: 'numeric',
						minute: '2-digit',
						hour12: true,
						year: 'numeric',
						month: 'long',
						day: 'numeric',
					})}
				</div>
				{/* stats */}
				{post.num_likes ? (
					<ul className="flex h-14 items-center border-t px-1.5 text-lg">
						<li>
							<strong>{post.num_likes}</strong> <span className="text-gray">Likes</span>
						</li>
					</ul>
				) : null}
				{/* actions */}
				<fetcher.Form
					action="/actions/post"
					method="post"
					className="flex h-14 items-center justify-around border-y text-gray-500"
				>
					<input type="hidden" name="post" value={post.id} />
					{/* Comments */}
					<Button variant="ghost" color="primary" square disabled>
						<Icon name="comment" size="lg" />
					</Button>
					{/* Reposts */}
					<Button variant="ghost" color="green" square disabled>
						<Icon name="repost" size="lg" />
					</Button>
					{/* Likes */}
					<Button
						type={user ? 'submit' : 'button'}
						name="action"
						value={post.is_liked ? 'unlike' : 'like'}
						variant="ghost"
						color="red"
						square
						active={post.is_liked}
					>
						<Icon name={post.is_liked ? 'like_fill' : 'like'} size="lg" />
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
