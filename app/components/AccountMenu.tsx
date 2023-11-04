import { Form } from '@remix-run/react'
import * as AK from '@ariakit/react'

import { useUser } from '~/utils'
import { Icon, Avatar, Text } from '~/components'

export const AccountMenu = () => {
	const user = useUser()
	const popover = AK.usePopoverStore()

	return (
		<>
			<AK.PopoverDisclosure
				store={popover}
				className="flex-center relative w-full cursor-pointer select-none rounded-full p-2 transition-colors hover:bg-gray-100 active:bg-gray-200 xl:p-3.5"
			>
				<Avatar
					size="sm"
					className="pointer-events-none sm:h-12 sm:w-12"
					src={user.avatarUrl}
					alt={user.username}
				/>
				<div className="hidden flex-auto items-center justify-between xl:flex">
					<div className="mx-3.5 flex flex-col text-start text-lg">
						<Text weight={7} className="leading-tight">
							{user.name}
						</Text>
						<Text color="gray" className="leading-tight">
							{`@${user.username}`}
						</Text>
					</div>
					<Icon name="dots" size="md" />
				</div>
			</AK.PopoverDisclosure>
			<AK.Popover store={popover}>
				<div className="w-72 drop-shadow-lg group-hover:block">
					<AK.PopoverArrow className="first:!fill-white" />
					<div className="flex rounded-xl border-t border-gray-100 bg-white py-3">
						<Form action="/auth/logout" method="post" className="w-full">
							<button className="w-full p-4 text-left text-lg leading-6 hover:bg-gray-100">
								Log out @{user.username}
							</button>
						</Form>
					</div>
				</div>
			</AK.Popover>
		</>
	)
}
