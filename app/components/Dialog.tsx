import * as React from 'react'
import * as AK from '@ariakit/react'

import { Text } from '~/components'

export const useDialog = AK.useDialogStore

export const Content = ({
	children,
	store,
}: {
	children: React.ReactNode
	store: AK.DialogStore
}) => {
	return (
		<AK.Dialog
			store={store}
			className="z-50 mx-auto h-screen w-full bg-white md:mt-[5%] md:h-auto md:max-w-[600px] md:rounded-2xl"
			backdropProps={{
				className: 'bg-black/50',
			}}
		>
			{children}
		</AK.Dialog>
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
			<AK.DialogDismiss children="" className="btn-icon i-close ghost dark" />
			{title && (
				<Text as={AK.DialogHeading} size="xl" weight={7} className="flex-auto pl-8">
					{title}
				</Text>
			)}
			{children}
		</header>
	)
}

export const Description = ({ children }: React.PropsWithChildren<{}>) => {
	return <AK.DialogDescription>{children}</AK.DialogDescription>
}
