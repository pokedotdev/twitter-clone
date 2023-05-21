import * as React from 'react'
import { useFetcher } from '@remix-run/react'
import { z } from 'zod'

import { removeExtraBreakLines, useUser } from '~/utils'
import { Avatar } from '~/components'
import type { action } from '~/routes/actions/post'

export const postFormSchema = z.object({
	repliedTo: z.string().uuid().optional(),
	body: z.string().trim().min(1).max(280).transform(removeExtraBreakLines),
})

export type PostFormProps = {
	template?: keyof typeof templates
	repliedTo?: string
	compact?: boolean
	onSuccess?: () => void
}

export const PostForm = (props: PostFormProps) => {
	const templateData = templates[props.template ?? 'new']
	const user = useUser()
	const fetcher = useFetcher<typeof action>()
	const form = fetcher.data?.form
	const [body, setBody] = React.useState(form?.value?.body ?? '')
	const [modified, setModified] = React.useState(false)
	const [compact, setCompact] = React.useState(!!props.compact)
	const textareaRef = React.useRef<HTMLTextAreaElement>(null)

	React.useEffect(() => {
		if (fetcher.state === 'loading') {
			if (!form?.error) {
				setBody('')
				if (textareaRef.current) textareaRef.current.style.height = '32px'
				if (props.compact) setCompact(true)
				props?.onSuccess?.()
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
					className={`flex flex-auto gap-3.5 ${compact ? 'items-center' : 'flex-col'}`}
				>
					{props?.repliedTo && <input type="hidden" name="repliedTo" value={props.repliedTo} />}
					<textarea
						ref={textareaRef}
						name="body"
						placeholder={templateData.placeholder}
						value={body}
						rows={1}
						required
						minLength={1}
						maxLength={280}
						className="box-content flex-auto resize-none overflow-hidden border-transparent py-3 text-2xl focus:border-gray-200 focus:outline-none"
						onChange={(event) => {
							event.currentTarget.style.height = '32px'
							event.currentTarget.style.height = `${event.currentTarget.scrollHeight}px`
							setModified(true)
							setBody(event.target.value)
						}}
						onFocus={() => setCompact(false)}
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
							{templateData.submit}
						</button>
					</div>
				</fetcher.Form>
			</div>
		</div>
	)
}

const templates = {
	new: {
		placeholder: "What's happening?",
		submit: 'Publish',
	},
	another: {
		placeholder: 'Add another Tweet!',
		submit: 'Publish',
	},
	reply: {
		placeholder: 'Tweet your reply!',
		submit: 'Reply',
	},
} satisfies Record<string, Template>

type Template = {
	placeholder: string
	submit: string
}
