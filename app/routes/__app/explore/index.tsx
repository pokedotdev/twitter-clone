import type { LoaderArgs } from '~/remix'
import { json, useLoaderData } from '~/remix'

import { PostList } from '~/components'
import { getPosts } from '~/models/post.server'
import { getContext } from '~/models/user.server'

export async function loader({ request }: LoaderArgs) {
	const ctx = await getContext(request)
	const posts = await getPosts(ctx)
	return json({ posts })
}

export default function LatestPostsRoute() {
	const data = useLoaderData<typeof loader>()

	return <PostList list={data.posts} />
}
