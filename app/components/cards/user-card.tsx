import { Link } from '@remix-run/react'

import { Avatar, ButtonFollow, Text } from '~/components'

export type UserCardProps = {
	user: any
}

export const UserCard = ({ user }: UserCardProps) => {
	return (
		<Link
			to={`/${user.username}`}
			className="flex gap-[14px] p-5 hover:bg-gray-50"
			key={user.id}
		>
			<div className="flex-none">
				<Avatar src={user.avatarUrl} alt={user.username} size="lg" />
			</div>

			<div className="flex flex-auto flex-col gap-2">
				<div className="flex justify-between">
					<div className="flex flex-col">
						<Text className="font-bold leading-none hover:underline">
							{user.name}
						</Text>
						<Text color="gray">{'@' + user.username}</Text>
					</div>
					<ButtonFollow profile={user} />
				</div>
				<Text as="p" size="md">
					{user.bio}
				</Text>
			</div>
		</Link>
	)
}
