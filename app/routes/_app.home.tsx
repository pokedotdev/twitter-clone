import { json, redirect } from '@remix-run/node'
import type { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { PostForm, PostList } from '~/components'
import { useOptionalUser } from '~/utils'
import { getContext } from '~/models/user.server'
import { getHomeFeed } from '~/models/post.server'

export async function loader({ request }: LoaderFunctionArgs) {
	const ctx = await getContext(request)
	if (!ctx.current_user_id) throw redirect('/explore')
	const posts = await getHomeFeed(ctx)
	return json({
		posts,
	})
}

export const handle = {
	header: {
		title: 'Home',
	},
}

export default function Home() {
	const user = useOptionalUser()
	const data = useLoaderData<typeof loader>()

	return (
		<div>
			{user && (
				<>
					<PostForm />
					<div className="my-[5px] h-0 border-b border-gray-200" />
				</>
			)}
			<PostList list={data.posts} />
		</div>
	)
}
