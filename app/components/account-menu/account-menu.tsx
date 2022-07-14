import { Form, useLocation } from '@remix-run/react'

import { useUser } from '~/utils'
import { Icon, Avatar, Text, Dialog } from '~/components'

export const AccountMenu = () => {
	const user = useUser()
	const location = useLocation()

	return (
		<Dialog.Root name="account-menu">
			<Dialog.Trigger className="relative flex cursor-pointer select-none rounded-full transition-colors hover:bg-gray-100 active:bg-gray-200 sm:p-3.5">
				<Avatar
					size="sm"
					className="pointer-events-none sm:h-12 sm:w-12"
					src={user.avatarUrl}
					alt={user.username}
				/>
				<div className="hidden flex-auto items-center justify-between xl:flex">
					<div className="mx-3.5 flex flex-col text-lg">
						<Text weight={7} className="leading-tight">
							{user.name}
						</Text>
						<Text color="gray" className="leading-tight">
							{`@${user.username}`}
						</Text>
					</div>
					<Icon name="dots" size="md" />
				</div>
			</Dialog.Trigger>

			<Dialog.Content>
				<div className="absolute bottom-full z-30 mb-2 min-w-[280px] group-hover:block">
					<div className="flex rounded-xl border border-gray-100 bg-white py-3 shadow-lg">
						<Form action="/auth/logout" method="post" className="w-full">
							<button
								name="redirectTo"
								value={location.pathname}
								className="w-full p-4 text-left text-lg leading-6 hover:bg-gray-100"
							>
								Log out @{user.username}
							</button>
						</Form>
					</div>
				</div>
			</Dialog.Content>
		</Dialog.Root>
	)
}
