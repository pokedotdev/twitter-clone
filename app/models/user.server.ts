import type { GitHubProfile } from 'remix-auth-github'

import type { InsertShape } from 'dbschema/edgeql-js/syntax/insert'
import type { CTX } from '~/db.server'
import { client, e } from '~/db.server'
import { authenticator } from '~/lib/auth.server'

export async function getUserId(request: Request) {
	const session = await authenticator.isAuthenticated(request)
	return session?.id
}

export async function getUser(request: Request) {
	const userId = await getUserId(request)
	if (!userId) return undefined
	const user = await getUserById(userId)
	if (user) return user
	throw await authenticator.logout(request, { redirectTo: '/404' })
}

export const currentUser = e.select(e.User, (user) => ({
	filter: e.op(user.id, '=', e.global.current_user_id),
}))

const UserFields = {
	id: true,
	username: true,
	name: true,
	avatarUrl: true,
	bio: true,
	coverUrl: true,
	location: true,
	website: true,
	created_at: true,
	is_own: true,
	is_followed: true,
	num_following: true,
	num_followers: true,
	num_tweets: true,
} as const

export async function getUsers(ctx: CTX) {
	const query = e.select(e.User, (user) => ({
		order_by: {
			expression: user.created_at,
			direction: e.DESC,
		},
		...UserFields,
	}))
	return query.run(client.withGlobals(ctx))
}

export async function getUserById(id: string) {
	const query = e.select(e.User, (user) => ({
		filter: e.op(user.id, '=', e.uuid(id)),
		...UserFields,
	}))
	return query.run(client)
}

export async function getUserByUsername(username: string, ctx: CTX) {
	const query = e.select(e.User, (user) => ({
		filter: e.op(user.username, '=', username),
		...UserFields,
	}))
	return query.run(client.withGlobals(ctx))
}

export async function getFollowers(data: { username: string }, ctx: CTX) {
	const query = e.select(e.User, (user) => ({
		filter: e.op(user.username, '=', data.username),
		followers: UserFields,
	}))
	const res = await query.run(client.withGlobals(ctx))
	return res?.followers || []
}

export async function getFollowings(data: { username: string }, ctx: CTX) {
	const query = e.select(e.User, (user) => ({
		filter: e.op(user.username, '=', data.username),
		following: UserFields,
	}))
	const res = await query.run(client.withGlobals(ctx))
	return res?.following || []
}

export async function findOrCreateUser(data: InsertShape<typeof e['User']>) {
	const insert = e.insert(e.User, data).unlessConflict((user) => ({
		on: user.provider,
		else: user,
	}))
	return insert.run(client)
}

export function mapUserFromGitHub(
	data: GitHubProfile
): InsertShape<typeof e['User']> {
	return {
		provider: { name: 'github', id: data.id },
		username: data.displayName,
		name: data._json.name || data.displayName,
		avatarUrl: data._json.avatar_url,
		bio: data._json.bio,
		location: data._json.location,
		website: data._json.blog,
	}
}

export async function followUser(
	data: { id: string; remove?: boolean },
	ctx: CTX
) {
	const friend = e.select(e.User, (user) => ({
		filter: e.op(user.id, '=', e.uuid(data.id)),
	}))
	const query = e.update(currentUser, () => ({
		set: {
			following: data.remove ? { '-=': friend } : { '+=': friend },
		},
	}))
	return query.run(client.withGlobals(ctx))
}
