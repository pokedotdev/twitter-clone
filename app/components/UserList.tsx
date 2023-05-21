import { UserCard } from './UserCard'

export type UserListProps = {
	list: any[]
}

export const UserList = ({ list }: UserListProps) => {
	return (
		<div>
			{list.map((user) => (
				<UserCard user={user} key={user.id} />
			))}
		</div>
	)
}
