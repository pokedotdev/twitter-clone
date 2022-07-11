import { Authenticator } from 'remix-auth'
import { GitHubStrategy } from 'remix-auth-github'

import { sessionStorage } from '~/lib/session.server'
import { mapUserFromGitHub, findOrCreateUser } from '~/models/user.server'

if (!process.env.GITHUB_CLIENT_ID)
	throw new Error('GITHUB_CLIENT_ID is required')
if (!process.env.GITHUB_CLIENT_SECRET)
	throw new Error('GITHUB_CLIENT_SECRET is required')

export const gitHubStrategy = new GitHubStrategy(
	{
		clientID: process.env.GITHUB_CLIENT_ID,
		clientSecret: process.env.GITHUB_CLIENT_SECRET,
		// TODO: add dynamic route (dev or prod)
		callbackURL: 'http://localhost:3000/auth/callback/github',
		scope: '',
	},
	async ({ profile }) => {
		const data = mapUserFromGitHub(profile)
		const user = await findOrCreateUser(data)
		return user
	}
)

type UserSession = Awaited<ReturnType<typeof findOrCreateUser>>

export const authenticator = new Authenticator<UserSession>(sessionStorage)

authenticator.use(gitHubStrategy as any)
