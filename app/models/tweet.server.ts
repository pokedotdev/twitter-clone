import type { $scopify } from 'edgedb/dist/reflection'

import type { $Tweet } from 'dbschema/edgeql-js/modules/default'
import { client, e } from '~/db.server'

export type TweetsType = Awaited<ReturnType<typeof getUserTweets>>

const TweetBody = (tweet: $scopify<$Tweet>) => ({
	order_by: {
		expression: tweet.created_at,
		direction: e.DESC,
	},
	id: true,
	created_at: true,
	body: true,
	user: {
		username: true,
		name: true,
		avatarUrl: true,
	},
	is_liked: true,
	num_likes: true,
})

export async function getHomeTweets(ctx: {}) {
	const query = e.select(e.Tweet, (tweet) => ({
		filter: e.op(
			e.op(tweet.user, 'in', e.global.current_user.following),
			'or',
			e.op(tweet.user, '=', e.global.current_user)
		),
		...TweetBody(tweet),
	}))
	const res = await query.run(client.withGlobals(ctx))
	return res
}

export async function getUserTweets(data: { username: string }, ctx: {}) {
	const query = e.select(e.User, (user) => ({
		filter: e.op(user.username, '=', data.username),
		tweets: TweetBody,
	}))
	const res = await query.run(client.withGlobals(ctx))
	return res?.tweets || []
}

export async function getUserLikedTweets(data: { username: string }, ctx: {}) {
	const query = e.select(e.User, (user) => ({
		filter: e.op(user.username, '=', data.username),
		likes: TweetBody,
	}))
	const res = await query.run(client.withGlobals(ctx))
	return res?.likes || []
}
