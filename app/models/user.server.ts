import type { GitHubProfile } from 'remix-auth-github'
import { unauthorized } from 'remix-utils'

import type { User, Context, ContextRequired } from '~/lib/db.server'
import { client, e, globals, ContextSchema } from '~/lib/db.server'
import { authenticator } from '~/lib/auth.server'

type InputUser = Pick<
	User,
	| 'provider'
	| 'username'
	| 'name'
	| 'avatarUrl'
	| 'bio'
	| 'location'
	| 'website'
>

const baseUserShape = e.shape(e.User, () => ({
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
}))

export async function getUserId(request: Request) {
	const session = await authenticator.isAuthenticated(request)
	return session?.id
}

export async function getContext(request: Request) {
	const context: Context = {
		current_user_id: await getUserId(request),
	}
	return ContextSchema.parse(context)
}
export async function getContextRequired(request: Request) {
	const res = ContextSchema.required().safeParse(await getContext(request))
	if (!res.success) throw unauthorized({ message: 'You need to login.' })
	return res.data
}

export async function getUser(request: Request) {
	const userId = await getUserId(request)
	if (!userId) return
	const user = await getUserById(userId)
	if (user) return user
	throw await authenticator.logout(request, { redirectTo: '/404' })
}

export function getUsers(ctx: Context) {
	const query = e.select(e.User, (user) => ({
		order_by: {
			expression: user.created_at,
			direction: e.DESC,
		},
		...baseUserShape(user),
	}))
	return query.run(client.withGlobals(ctx))
}

export function getUserById(id: string) {
	const query = e.select(e.User, (user) => ({
		filter_single: { id },
		...baseUserShape(user),
	}))
	return query.run(client)
}

export function getUserByUsername(username: string, ctx: Context) {
	const query = e.select(e.User, (user) => ({
		filter_single: { username },
		...baseUserShape(user),
	}))
	return query.run(client.withGlobals(ctx))
}

export async function getFollowers(data: { username: string }, ctx: Context) {
	const query = e.select(e.User, () => ({
		filter_single: { username: data.username },
		followers: baseUserShape,
	}))
	const res = await query.run(client.withGlobals(ctx))
	return res?.followers || []
}

export async function getFollowings(data: { username: string }, ctx: Context) {
	const query = e.select(e.User, () => ({
		filter_single: { username: data.username },
		following: baseUserShape,
	}))
	const res = await query.run(client.withGlobals(ctx))
	return res?.following || []
}

export function findOrCreateUser(data: InputUser) {
	const insert = e.insert(e.User, data).unlessConflict((user) => ({
		on: user.provider,
		else: user,
	}))
	return insert.run(client)
}

export function followUser(
	data: { id: string; remove?: boolean },
	ctx: ContextRequired
) {
	const friend = e.select(e.User, (user) => ({
		filter_single: { id: data.id },
	}))
	const query = e.update(globals.currentUser, () => ({
		set: { following: data.remove ? { '-=': friend } : { '+=': friend } },
	}))
	return query.run(client.withGlobals(ctx))
}

export function mapUserFromGitHub(data: GitHubProfile): InputUser {
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
