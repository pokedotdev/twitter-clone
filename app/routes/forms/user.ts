import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'

import { followUser, getUserId } from '~/models/user.server'

export async function loader(_: LoaderArgs) {
	return redirect('/')
}

export async function action({ request }: ActionArgs) {
	const formData = await request.formData()

	const ctx = {
		current_user_id: await getUserId(request),
	}

	switch (formData.get('action')) {
		case 'follow': {
			const userId = formData.get('user')?.toString()
			const remove = formData.get('remove')?.toString() === 'true'
			if (!userId) return
			await followUser({ id: userId, remove }, ctx)
		}
	}
}
