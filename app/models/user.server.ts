import type { GitHubProfile } from 'remix-auth-github'

import type { InsertShape } from 'dbschema/edgeql-js/syntax/insert'
import { client, e } from '~/db.server'
import { authenticator } from '~/lib/auth.server'

export async function getUser(request: Request) {
	const session = await authenticator.isAuthenticated(request.clone())
	if (!session || !session.id) return null
	const user = await getUserById(session.id)
	if (user) return user
	throw await authenticator.logout(request, { redirectTo: '/404' })
}

export async function getUserById(id: string) {
	return await e
		.select(e.User, (user) => ({
			...e.User['*'],
			filter: e.op(user.id, '=', e.uuid(id)),
		}))
		.run(client)
}

export async function getUserByUsername(username: string) {
	return await e
		.select(e.User, (user) => ({
			...e.User['*'],
			filter: e.op(user.username, '=', username),
		}))
		.run(client)
}

export async function getUsers() {
	return await e
		.select(e.User, () => ({
			id: true,
			username: true,
			tweets: {
				id: true,
				body: true,
			},
		}))
		.run(client)
}

export async function findOrCreateUser(data: InsertShape<typeof e['User']>) {
	return await e
		.insert(e.User, data)
		.unlessConflict((user) => ({
			on: user.provider,
			else: user,
		}))
		.run(client)
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
