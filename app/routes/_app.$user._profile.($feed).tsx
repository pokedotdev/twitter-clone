import type { LoaderFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { getContext } from '~/models/user.server'
import * as PostModel from '~/models/post.server'
import { PostList } from '~/components'

export async function loader({ params, request }: LoaderFunctionArgs) {
	let posts: PostModel.PostCardFieldsType[] = []

	const { user: username, feed } = params
	if (!username) return json({ posts })

	const ctx = await getContext(request)

	if (feed === undefined) posts = await PostModel.getUserPosts({ username }, ctx)
	else if (feed === 'with_replies') posts = await PostModel.getUserReplies({ username }, ctx)
	else if (feed === 'media') posts = []
	else if (feed === 'likes') posts = await PostModel.getUserLikedPosts({ username }, ctx)

	return json({ posts })
}

export default function UserFeedRoute() {
	const data = useLoaderData<typeof loader>()

	return <PostList list={data.posts} />
}
