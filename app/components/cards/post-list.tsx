import { Post } from './post-card'

export type PostListProps = {
	list: any[]
}

export const PostList = (props: PostListProps) => {
	return (
		<div>
			{props.list.map((post) => (
				<Post post={post} key={post.id} />
			))}
		</div>
	)
}
