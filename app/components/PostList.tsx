import { PostCard } from './PostCard'

export type PostListProps = {
	list: any[]
	border?: boolean
	threaded?: boolean
}

export const PostList = ({ list, ...rest }: PostListProps) => {
	return (
		<div>
			{list.map((post) => (
				<PostCard post={post} key={post.id} {...rest} />
			))}
		</div>
	)
}
