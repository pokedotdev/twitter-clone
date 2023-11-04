import { Link, useNavigate } from '@remix-run/react'

import { Avatar, ButtonFollow, Text } from '~/components'

export type UserCardProps = {
	user: any
}

export const UserCard = ({ user }: UserCardProps) => {
	const navigate = useNavigate()

	return (
		<div
			className="relative z-0 flex cursor-pointer gap-[14px] p-5 hover:bg-gray-50"
			key={user.id}
			onClick={() => navigate(`/${user.username}`)}
		>
			<Link to={`/${user.username}`} className="flex-none">
				<Avatar src={user.avatarUrl} alt={user.username} size="lg" />
			</Link>

			<div className="flex flex-auto flex-col gap-2">
				<div className="flex justify-between">
					<Link to={`/${user.username}`} className="flex flex-auto flex-col">
						<Text className="font-bold leading-none hover:underline">{user.name}</Text>
						<Text color="gray">{'@' + user.username}</Text>
					</Link>
					<ButtonFollow profile={user} onClick={(e) => e.stopPropagation()} />
				</div>
				<Text as="p" size="md">
					{user.bio}
				</Text>
			</div>
		</div>
	)
}
