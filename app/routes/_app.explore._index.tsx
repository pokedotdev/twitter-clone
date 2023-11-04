import type { LoaderFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { PostList } from '~/components'
import { getPosts } from '~/models/post.server'
import { getContext } from '~/models/user.server'

export async function loader({ request }: LoaderFunctionArgs) {
	const ctx = await getContext(request)
	const posts = await getPosts(ctx)
	return json({ posts })
}

export default function LatestPostsRoute() {
	const data = useLoaderData<typeof loader>()

	return <PostList list={data.posts} />
}
