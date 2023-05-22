import * as React from 'react'
import type { LoaderArgs, V2_MetaFunction } from '~/remix'
import { json, useFetcher, Link, useLoaderData } from '~/remix'
import { badRequest, notFound } from 'remix-utils'

import { Avatar, ReplyDialog, PostForm, PostList, Text } from '~/components'
import { findPostById } from '~/models/post.server'
import { getContext } from '~/models/user.server'
import { formatPostDate, useOptionalUser } from '~/utils'

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => {
	if (!data?.post) return []
	return [{ title: `${data.post.user.name}: "${data.post.body}"` }]
}

export async function loader({ request, params }: LoaderArgs) {
	if (!params.postId) throw badRequest({ message: 'param ID required' })
	const ctx = await getContext(request)
	const post = await findPostById({ id: params.postId }, ctx)
	if (!post) throw notFound({ message: 'Post not found' })
	const formatted_date = formatPostDate(post.created_at)

	return json({ post: { ...post, formatted_date } })
}

export const handle = { header: { title: 'Post' } }

export default function PostRoute() {
	const { post } = useLoaderData<typeof loader>()
	const user = useOptionalUser()
	const fetcher = useFetcher()
	const main = React.useRef<HTMLElement>(null)

	React.useEffect(() => {
		if (!main.current) return
		const position = main.current.getBoundingClientRect().top
		scrollBy({ top: -78 + position })
	}, [post])

	return (
		<div>
			<aside>
				{/* render another 10 if is intercepted  */}
				<PostList list={[...post.ancestors].reverse()} border={false} threaded />
			</aside>
			<article ref={main} className="mt-3 px-5" id="main-article" tabIndex={-1}>
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
						className="break-words text-xl leading-tight"
						style={{
							wordBreak: 'break-word',
							whiteSpace: 'pre-wrap',
						}}
					>
						{post.body}
					</span>
				</div>
				{/* info */}
				<div className="text-gray my-5 text-lg leading-tight">{post.formatted_date}</div>
				{/* stats */}
				{post.num_likes ? (
					<ul className="h-15 flex items-center border-t px-1.5 text-lg">
						<li>
							<strong>{post.num_likes}</strong> <span className="text-gray">Likes</span>
						</li>
					</ul>
				) : null}
				{/* actions */}
				<fetcher.Form
					action="/actions/post"
					method="post"
					className="h-15 flex items-center justify-around border-y text-gray-500"
				>
					<input type="hidden" name="post" value={post.id} />
					{/* Comments */}
					<ReplyDialog repliedTo={post.id} isOwn={post.user.username === user?.username}>
						<button className="btn-icon i-comment ghost primary text-[1.7rem]" />
					</ReplyDialog>
					{/* Reposts */}
					<button className="btn-icon i-repost ghost green text-[1.7rem]" disabled />
					{/* Likes */}
					<button
						type={user ? 'submit' : 'button'}
						name="action"
						value={post.is_liked ? 'unlike' : 'like'}
						className={`btn-icon ghost rose text-[1.7rem] ${
							post.is_liked ? 'i-like_fill text-$color' : 'i-like'
						}`}
					/>
					{/* Share */}
					<button className="btn-icon i-share ghost primary text-[1.7rem]" disabled />
				</fetcher.Form>
			</article>
			{/* reply form */}
			{user && (
				<div className="border-b py-2">
					<PostForm template="reply" repliedTo={post.id} compact />
				</div>
			)}
			{/* replies */}
			<PostList list={post.replies} />
			<div className="min-h-[calc(100vh-64px)] flex-none" />
		</div>
	)
}
