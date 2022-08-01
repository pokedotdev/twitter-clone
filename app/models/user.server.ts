import type { GitHubProfile } from 'remix-auth-github'
import type { $scopify } from 'edgedb/dist/reflection'

import type { $User } from 'dbschema/edgeql-js/modules/default'
import type { InsertShape } from 'dbschema/edgeql-js/syntax/insert'
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

const UserBody = (user: $scopify<$User>) => ({
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
	is_followed: e.op(user, 'in', e.global.current_user.following),
	num_following: e.count(user.following),
	num_followers: e.count(user.followers),
	num_tweets: e.count(user.tweets),
})

export async function getUsers(ctx: {}) {
	const query = e.select(e.User, (user) => ({
		order_by: {
			expression: user.created_at,
			direction: e.DESC,
		},
		...UserBody(user),
	}))
	return query.run(client.withGlobals(ctx))
}

export async function getUserById(id: string) {
	const query = e.select(e.User, (user) => ({
		filter: e.op(user.id, '=', e.uuid(id)),
		...UserBody(user),
	}))
	return query.run(client)
}

export async function getUserByUsername(username: string, ctx: {}) {
	const query = e.select(e.User, (user) => ({
		filter: e.op(user.username, '=', username),
		...UserBody(user),
	}))
	return query.run(client.withGlobals(ctx))
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
	ctx: {}
) {
	const friend = e.select(e.User, (user) => ({
		filter: e.op(user.id, '=', e.uuid(data.id)),
	}))
	const query = e.update(e.global.current_user, () => ({
		set: {
			following: data.remove ? { '-=': friend } : { '+=': friend },
		},
	}))
	return query.run(client.withGlobals(ctx))
}
