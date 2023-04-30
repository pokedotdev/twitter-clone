import { createClient } from 'edgedb'

import e from './codegen/edgeql'

const client = createClient()

async function seed() {
	const provider = {
		name: 'github',
		id: '123',
	}
	const user = e
		.select(e.User, (u) => ({
			filter: e.op(
				e.op(u.provider.id, '=', provider.id),
				'and',
				e.op(u.provider.name, '=', provider.name),
			),
		}))
		.assert_single()

	// cleanup the existing database
	await e.delete(user).run(client)

	// create user and account nestedly
	await e
		.insert(e.User, {
			provider,
			username: 'test',
			name: 'Test User',
		})
		.run(client)

	// create tweets
	await e
		.set(
			e.insert(e.Post, {
				body: 'Hello, world!',
				user,
			}),
			e.insert(e.Post, {
				body: 'Second tweet',
				user,
			}),
		)
		.run(client)

	console.log(`Database has been seeded. 🌱`)
}

seed()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		client.close()
	})
