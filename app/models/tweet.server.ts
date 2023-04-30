import type { Context, $infer } from '~/lib/db.server'
import { client, e, globals } from '~/lib/db.server'

export type TweetCardFieldsType = $infer<typeof selectTweets>[0]

const baseTweetShape = e.shape(e.Post, () => ({
	tag: true,
	id: true,
	created_at: true,
	user: {
		username: true,
		name: true,
		avatarUrl: true,
	},
	body: true,
	is_liked: true,
	is_retweeted: true,
	num_likes: true,
	num_retweets: true,
	num_replies: true,
}))

export async function createTweet(data: { body: string }, ctx: Context) {
	const insert = e.insert(e.Post, {
		...data,
		user: globals.currentUser,
	})
	return insert.run(client.withGlobals(ctx))
}

export async function findTweetById(data: { id: string }, ctx: Context) {
	const query = e.select(e.Post, (tweet) => ({
		filter_single: { id: data.id },
		...baseTweetShape(tweet),
	}))
	return query.run(client.withGlobals(ctx))
}

export async function likeTweet(data: { id: string; remove?: boolean }, ctx: Context) {
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

const selectTweets = e.select(e.Post, baseTweetShape)

export async function getTweets(ctx: Context) {
	const query = e.select(e.Post, (tweet) => ({
		order_by: {
			expression: tweet.created_at,
			direction: e.DESC,
		},
		...baseTweetShape(tweet),
	}))
	return query.run(client.withGlobals(ctx))
}

export async function getHomeTweets(ctx: Context) {
	const query = e.select(e.Post, (tweet) => ({
		filter: e.op(
			e.op(tweet.user, 'in', globals.currentUser.following),
			'or',
			e.op(tweet.user, '=', globals.currentUser),
		),
		order_by: {
			expression: tweet.created_at,
			direction: e.DESC,
		},
		...baseTweetShape(tweet),
	}))
	return query.run(client.withGlobals(ctx))
}

export async function getUserTweets(data: { username: string }, ctx: Context) {
	const filter = e.select(e.User, () => ({
		filter_single: { username: data.username },
	})).tweets
	const query = e.select(filter, (tweet) => ({
		order_by: {
			expression: tweet.created_at,
			direction: e.DESC,
		},
		...baseTweetShape(tweet),
	}))
	return query.run(client.withGlobals(ctx))
}

export async function getUserLikedTweets(data: { username: string }, ctx: Context) {
	const user = e.select(e.User, () => ({ filter_single: { username: data.username } }))
	const likes = e.select(user.likes, (item) => ({
		order_by: {
			expression: item.created_at,
			direction: 'DESC',
		},
		post: baseTweetShape,
	}))
	const res = await likes.run(client.withGlobals(ctx))
	return res.map((item) => item.post)
}
