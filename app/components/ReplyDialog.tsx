import * as React from 'react'

import { ButtonProvider, Dialog, FormAuth, PostForm } from '~/components'
import { useOptionalUser } from '~/utils'

export const ReplyDialog = (props: {
	repliedTo: string
	isOwn: boolean
	children: React.ReactElement
}) => {
	const user = useOptionalUser()
	const dialog = Dialog.useDialog()

	const element = React.cloneElement(props.children as any, {
		onClick: (event) => {
			event.preventDefault()
			dialog.toggle()
		},
	})

	return (
		<>
			{element}
			<Dialog.Content store={dialog}>
				<Dialog.Header />
				{user ? (
					<PostForm
						repliedTo={props.repliedTo}
						template={props.isOwn ? 'another' : 'reply'}
						onSuccess={() => dialog.setOpen(false)}
					/>
				) : (
					<div className="flex-center w-full max-w-[600px]">
						<div className="m-6 mt-0 flex w-full max-w-[400px] flex-col px-4">
							<h3 className="mb-2 text-3xl font-bold">Reply to join the conversation.</h3>
							<p className="text-gray mb-6">
								Once you join Twitter, you will be able to reply to Tweets.
							</p>
							<FormAuth className="w-full">
								<ButtonProvider provider="github" className="btn solid primary h-13 w-full" />
							</FormAuth>
						</div>
					</div>
				)}
			</Dialog.Content>
		</>
	)
}
