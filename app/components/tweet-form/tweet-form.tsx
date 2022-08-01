import * as React from 'react'
import { useFetcher } from '@remix-run/react'

import { useUser } from '~/utils'
import { Avatar, Button } from '~/components'

export const TweetForm = () => {
	const user = useUser()
	const fetcher = useFetcher()
	const isAdding =
		fetcher.state === 'submitting' &&
		fetcher.submission.formData.get('action') === 'create'
	let formRef = React.useRef<HTMLFormElement>(null)

	React.useEffect(() => {
		if (!isAdding) {
			formRef.current?.reset()
		}
	}, [isAdding])

	return (
		<div className="flex gap-3.5 px-5 py-3.5">
			<Avatar src={user.avatarUrl} alt={user.username} size="lg" />
			<fetcher.Form
				ref={formRef}
				action="/forms/tweet"
				method="post"
				className="flex flex-auto flex-col gap-3.5"
			>
				<textarea
					id="tweet-body"
					name="body"
					placeholder="What's happening?"
					rows={1}
					className="resize-none border-b border-transparent py-3 text-2xl focus:border-gray-200 focus:outline-none"
				/>
				<div>
					<Button
						name="action"
						value="create"
						type="submit"
						color="primary"
						aria-label="Create tweet"
					>
						Tweet
					</Button>
				</div>
			</fetcher.Form>
		</div>
	)
}
