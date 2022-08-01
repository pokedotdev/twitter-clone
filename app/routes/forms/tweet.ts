import type { ActionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'

import { client, e } from '~/db.server'
import { authenticator } from '~/lib/auth.server'

// Create a new tweet
export async function action({ request }: ActionArgs) {
	const session = await authenticator.isAuthenticated(request.clone())
	if (!session || !session.id) throw new Error('Not authenticated')

	const formData = await request.formData()
	const body = formData.get('body')?.toString()

	if (!body) return null

	const user = e.select(e.User, (u) => ({
		filter: e.op(u.id, '=', e.uuid(session.id)),
	}))

	const tweet = await e
		.insert(e.Tweet, {
			body,
			tweet_type: 'TWEET',
			user,
		})
		.run(client)

	return json({ tweet })
}
