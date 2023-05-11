import { useFetcher } from '@remix-run/react'
import { z } from 'zod'
import * as React from 'react'

import { removeExtraBreakLines, useUser } from '~/utils'
import { Avatar } from '~/components'
import type { action } from '~/routes/actions/post'

export const postFormSchema = z.object({
	body: z.string().trim().min(1).max(280).transform(removeExtraBreakLines),
})

export type PostFormProps = {
	onSuccess?: () => void
}

export const PostForm = (props: PostFormProps) => {
	const user = useUser()
	const fetcher = useFetcher<typeof action>()
	const form = fetcher.data?.form
	const [body, setBody] = React.useState(form?.value?.body ?? '')
	const [modified, setModified] = React.useState(false)

	React.useEffect(() => {
		if (fetcher.type === 'actionReload' || fetcher.type === 'actionRedirect') {
			if (!form?.error) {
				setBody('')
				props.onSuccess?.()
			} else {
				setModified(false)
			}
		}
	}, [fetcher, form, props, modified])

	return (
		<div className="flex flex-col gap-2">
			{form?.error && !modified && (
				<div className="px-5 py-1">
					<div className="rounded-lg bg-red-500/10 px-5 py-3">{form.error}</div>
				</div>
			)}
			<div className="flex gap-3.5 px-5 pb-2.5 pt-2.5">
				<Avatar src={user.avatarUrl} alt={user.username} size="lg" />
				<fetcher.Form
					action="/actions/post"
					method="post"
					className="flex flex-auto flex-col gap-3.5"
				>
					<textarea
						name="body"
						placeholder="What's happening?"
						value={body}
						rows={1}
						required
						minLength={1}
						maxLength={280}
						className="resize-none overflow-hidden border-b border-transparent py-3 text-2xl focus:border-gray-200 focus:outline-none"
						onChange={(event) => {
							event.currentTarget.style.height = '1px'
							event.currentTarget.style.height = `${event.currentTarget.scrollHeight}px`
							setModified(true)
							setBody(event.target.value)
						}}
					/>
					<div className="flex justify-between">
						<div>{/* TODO: add media buttons */}</div>
						<button
							name="action"
							value="create"
							type="submit"
							className="btn solid primary"
							aria-label="Create post"
							disabled={!body.length || (form?.error && !modified)}
						>
							Publish
						</button>
					</div>
				</fetcher.Form>
			</div>
		</div>
	)
}
