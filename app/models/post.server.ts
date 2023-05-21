import type { Context, $infer } from '~/lib/db.server'
import { client, e, globals } from '~/lib/db.server'

export type PostCardFieldsType = $infer<typeof selectPosts>[0]

const basePostShape = e.shape(e.Post, () => ({
	id: true,
	created_at: true,
	user: {
		username: true,
		name: true,
		avatarUrl: true,
	},
	body: true,
	is_liked: true,
	is_reposted: true,
	num_likes: true,
	num_reposts: true,
	num_replies: true,
}))

export async function createPost(data: { body: string; repliedTo?: string }, ctx: Context) {
	const insert = e.insert(e.Post, {
		body: data.body,
		replied_to: data.repliedTo
			? e.select(e.Post, () => ({ filter_single: { id: data.repliedTo as string } }))
			: undefined,
		user: globals.currentUser,
	})
	return insert.run(client.withGlobals(ctx))
}

export async function findPostById(data: { id: string }, ctx: Context) {
	const query = e.select(e.Post, (post) => ({
		filter_single: { id: data.id },
		...basePostShape(post),
		ancestors: basePostShape,
		replies: (reply) => ({
			order_by: [
				// priority: author's replies, replies with author's reply, and follower's replies
				{ expression: e.op(reply.user, '=', post.user) },
				{ expression: e.op(post.user, 'in', reply.replies.user) },
				{ expression: e.op(reply.user, 'in', globals.currentUser.followers) },
				{ expression: reply.created_at, direction: e.ASC },
				// { expression: reply.num_likes, direction: e.DESC },
			],
			...basePostShape(reply),
		}),
	}))
	return query.run(client.withGlobals(ctx))
}

export async function likePost(data: { id: string; remove?: boolean }, ctx: Context) {
	const post = e.select(e.Post, () => ({ filter_single: { id: data.id } }))
	if (data.remove) {
		const remove_like = e.delete(e.PostLike, () => ({
			filter_single: { user: globals.currentUser, post },
		}))
		return remove_like.run(client.withGlobals(ctx))
	}
	const like = e.insert(e.PostLike, { user: globals.currentUser, post })
	return like.run(client.withGlobals(ctx))
}

const selectPosts = e.select(e.Post, basePostShape)

export async function getPosts(ctx: Context) {
	const query = e.select(e.Post, (post) => ({
		filter: e.op('not', e.op('exists', post.replied_to)),
		order_by: {
			expression: post.created_at,
			direction: e.DESC,
		},
		...basePostShape(post),
	}))
	return query.run(client.withGlobals(ctx))
}

export async function getHomeFeed(ctx: Context) {
	const filtered = e.select(e.Post, (post) => ({
		filter: e.op(
			e.op('not', e.op('exists', post.replied_to)),
			'and',
			e.op(
				e.op(post.user, 'in', globals.currentUser.following),
				'or',
				e.op(post.user, '=', globals.currentUser),
			),
		),
	}))
	const query = e.select(filtered, (post) => ({
		order_by: {
			expression: post.created_at,
			direction: e.DESC,
		},
		...basePostShape(post),
	}))
	return query.run(client.withGlobals(ctx))
}

export async function getUserPosts(data: { username: string }, ctx: Context) {
	const query = e.select(e.Post, (post) => ({
		filter: e.op(
			e.op(post.user.username, '=', data.username),
			'and',
			e.op('not', e.op('exists', post.replied_to)),
		),
		order_by: {
			expression: post.created_at,
			direction: e.DESC,
		},
		...basePostShape(post),
	}))
	return query.run(client.withGlobals(ctx))
}

export async function getUserReplies(data: { username: string }, ctx: Context) {
	const query = e.select(e.Post, (post) => ({
		filter: e.op(
			e.op(post.user.username, '=', data.username),
			'and',
			e.op('exists', post.replied_to),
		),
		order_by: {
			expression: post.created_at,
			direction: e.DESC,
		},
		...basePostShape(post),
	}))
	return query.run(client.withGlobals(ctx))
}

export async function getUserLikedPosts(data: { username: string }, ctx: Context) {
	const user = e.select(e.User, () => ({ filter_single: { username: data.username } }))
	const likes = e.select(user.likes, (item) => ({
		order_by: {
			expression: item.created_at,
			direction: 'DESC',
		},
		post: basePostShape,
	}))
	const res = await likes.run(client.withGlobals(ctx))
	return res.map((item) => item.post)
}
