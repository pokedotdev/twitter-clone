import * as React from 'react'

import { Dialog, PostForm } from '~/components'

export const ReplyDialog = (props: {
	repliedTo: string
	isOwn: boolean
	children: React.ReactElement
}) => {
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
				<PostForm
					repliedTo={props.repliedTo}
					template={props.isOwn ? 'another' : 'reply'}
					onSuccess={() => dialog.setOpen(false)}
				/>
			</Dialog.Content>
		</>
	)
}
