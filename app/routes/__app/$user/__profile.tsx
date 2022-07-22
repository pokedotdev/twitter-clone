import { Link, Outlet } from '@remix-run/react'

import { useOptionalUser, useProfile } from '~/utils'
import { Button, Text, Icon, Tabs, Avatar } from '~/components'

export default function ProfileLayout() {
	const profile = useProfile()
	const user = useOptionalUser()
	const isOwn = user?.id === profile.id

	return (
		<div className="flex flex-col">
			{/* {isOwn && (
				<Modal name="edit:profile">
					content
					<br />
					asdfasdfsafasdfsfsfsafsaf
					<br />
					asdfasdf
				</Modal>
			)} */}
			<div>
				{/* Banner */}
				<div
					className="aspect-[3/1] bg-gray-200 dark:bg-gray-600"
					aria-hidden="true"
					tabIndex={-1}
				>
					{profile.coverUrl && (
						<img
							alt=""
							draggable="true"
							src={profile.coverUrl}
							className="h-full w-full object-cover"
						/>
					)}
				</div>
				{/* User info */}
				<div className="px-5 py-3.5">
					<div className="flex items-center justify-between">
						<Avatar
							src={profile.avatarUrl}
							alt={profile.username}
							size="xl"
							className="border-4.5 border-white bg-white"
							style={{ marginTop: '-15%' }}
						/>
						<div className="flex gap-2.5">
							{isOwn ? (
								<a href="#edit:profile">
									<Button as="div" variant="ghost" outline>
										Edit Profile
									</Button>
								</a>
							) : (
								<>
									<Button variant="ghost" outline icon="dots" />
									<Button variant="ghost" outline icon="message" />
									<Button aria-label={`'Follow ${profile.username}`}>
										Follow
									</Button>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
			<div className="px-5">
				{/* User name */}
				<Text as="h1" size="xl" weight={8} className="leading-tight">
					{profile.name}
				</Text>
				<Text color="gray" className="leading-tight">
					@{profile.username}
				</Text>

				{/* Bio */}
				<Text className="my-3 block leading-snug">{profile.bio}</Text>

				{/* Info */}
				<Text
					as="div"
					color="gray"
					size="md"
					className="my-3 flex flex-wrap gap-3"
				>
					{profile.location && (
						<span className="flex items-center gap-1">
							<Icon name="location" size="md" />
							{profile.location}
						</span>
					)}
					{profile.website && (
						<span className="flex items-center gap-1">
							<Icon name="link" size="md" />
							<a
								href={profile.website}
								target="_blank"
								className="link"
								rel="noreferrer"
							>
								{profile.website}
							</a>
						</span>
					)}
					{profile.created_at && (
						<span className="flex items-center gap-1">
							<Icon name="calendar" size="md" />
							{profile.created_at}
						</span>
					)}
				</Text>

				{/* Stats */}
				<div className="my-3 flex gap-4">
					<Link to="following" className="hover:underline">
						<Text weight={7}>505</Text> <Text color="gray">Following</Text>
					</Link>
					<Link to="followers" className="hover:underline">
						<Text weight={7}>11</Text> <Text color="gray">Followers</Text>
					</Link>
				</div>
			</div>

			{/* Tabs */}
			<Tabs
				list={[
					{ label: 'Tweets', to: '', end: true },
					{ label: 'Tweets & replies', to: 'with_replies' },
					{ label: 'Media', to: 'media' },
					{ label: 'Likes', to: 'likes' },
				]}
			/>

			{/* Feed */}
			<Outlet />
		</div>
	)
}
