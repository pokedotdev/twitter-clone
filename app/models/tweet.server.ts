import type { InsertShape } from 'dbschema/edgeql-js/syntax/insert'
import type { CTX, $infer } from '~/db.server'
import { client, e } from '~/db.server'
import { currentUser } from '~/models/user.server'

export type TweetCardFieldsType = $infer<typeof selectTweets>[0]

export async function createTweet(
	data: Omit<InsertShape<typeof e['Tweet']>, 'user'>,
	ctx: CTX
) {
	const insert = e.insert(e.Tweet, {
		...data,
		user: currentUser,
	})
	return insert.run(client.withGlobals(ctx))
}

export async function likeTweet(
	data: { id: string; remove?: boolean },
	ctx: CTX
) {
	const tweet = e.select(e.Tweet, (tweet) => ({
		filter: e.op(tweet.id, '=', e.uuid(data.id)),
	}))
	const update = e
		.update(currentUser, () => ({
			set: {
				likes: data.remove ? { '-=': tweet } : { '+=': tweet },
			},
		}))
		.assert_single()
	return update.run(client.withGlobals(ctx))
}

const TweetCardFields = {
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
} as const

const selectTweets = e.select(e.BaseTweet, () => TweetCardFields)

export async function getTweets(ctx: CTX) {
	const query = e.select(e.BaseTweet, (tweet) => ({
		order_by: {
			expression: tweet.created_at,
			direction: e.DESC,
		},
		...TweetCardFields,
	}))
	return query.run(client.withGlobals(ctx))
}

export async function getHomeTweets(ctx: CTX) {
	const query = e.select(e.BaseTweet, (tweet) => ({
		filter: e.op(
			e.op(tweet.user, 'in', currentUser.following),
			'or',
			e.op(tweet.user, '=', currentUser)
		),
		order_by: {
			expression: tweet.created_at,
			direction: e.DESC,
		},
		...TweetCardFields,
	}))
	return query.run(client.withGlobals(ctx))
}

export async function getUserTweets(data: { username: string }, ctx: CTX) {
	const filter = e.select(e.User, (user) => ({
		filter: e.op(user.username, '=', data.username),
	})).tweets
	const query = e.select(filter, (tweet) => ({
		order_by: {
			expression: tweet.created_at,
			direction: e.DESC,
		},
		...TweetCardFields,
	}))
	return query.run(client.withGlobals(ctx))
}

export async function getUserLikedTweets(data: { username: string }, ctx: CTX) {
	const query = e.select(e.User, (user) => ({
		filter: e.op(user.username, '=', data.username),
		likes: (tweet) => ({
			order_by: {
				expression: tweet['@created_at'],
				direction: e.DESC,
			},
			...TweetCardFields,
		}),
	}))
	const res = await query.run(client.withGlobals(ctx))
	return res?.likes || []
}
