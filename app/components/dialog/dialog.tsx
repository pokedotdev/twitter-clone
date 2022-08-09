import * as React from 'react'
import * as Dialog from 'ariakit/dialog'
import type { DisclosureState } from 'ariakit'

import { Button, Text } from '~/components'

export const useDialog = Dialog.useDialogState

export const Content = ({
	children,
	state,
}: {
	children: React.ReactNode
	state: DisclosureState
}) => {
	return (
		<Dialog.Dialog
			state={state}
			className="z-50 mx-auto h-screen w-full bg-white md:mt-[5%] md:h-auto md:max-w-[600px] md:rounded-2xl"
			backdropProps={{
				className: 'bg-black/50',
			}}
		>
			{children}
		</Dialog.Dialog>
	)
}

export const Trigger = ({ children }: { children: React.ReactElement }) => {
	const dialog = useDialog()
	if (!dialog) return null
	return React.cloneElement(children, { onClick: dialog.toggle })
}

export const Header = ({
	children,
	title,
}: React.PropsWithChildren<{
	title?: string
}>) => {
	return (
		<header className="flex h-16 w-full items-center justify-between px-2">
			<Button as={Dialog.DialogDismiss} variant="ghost" icon="close" />
			{title && (
				<Text
					as={Dialog.DialogHeading}
					size="xl"
					weight={7}
					className="flex-auto pl-8"
				>
					{title}
				</Text>
			)}
			{children}
		</header>
	)
}

export const Description = ({ children }: React.PropsWithChildren<{}>) => {
	return <Dialog.DialogDescription>{children}</Dialog.DialogDescription>
}
