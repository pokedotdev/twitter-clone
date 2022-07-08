import { client, e } from '~/db.server'

export async function getUsers() {
	return await e.select(e.User, () => ({
		id: true,
		username: true,
		tweets: {
			id: true,
			body: true
		},
	})).run(client)
}