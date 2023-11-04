import { Link, Outlet } from '@remix-run/react'

import { formatUserCreatedDate, parseDomainToValidUrl, useProfile } from '~/utils'
import { Text, Tabs, Avatar, ButtonFollow } from '~/components'

export default function ProfileLayout() {
	const profile = useProfile()

	return (
		<div className="flex flex-col">
			<div>
				{/* Banner */}
				<div className="aspect-[3/1] bg-gray-200 dark:bg-gray-600" aria-hidden="true" tabIndex={-1}>
					{profile?.coverUrl && (
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
							className="border-4.5 box-content border-white bg-white"
							style={{ marginTop: '-15%' }}
						/>
						<div className="flex gap-2.5">
							{profile.is_own ? (
								<button className="btn ghost dark outline" disabled>
									Edit Profile
								</button>
							) : (
								<>
									{/* <button className="btn-icon i-dots ghost dark outline" />
									<button className="btn-icon i-message ghost dark outline" /> */}
									<ButtonFollow profile={profile} />
								</>
							)}
						</div>
					</div>
				</div>
			</div>
			<div className="px-5">
				{/* User name */}
				<Text as="h1" size="xl" weight={7} className="leading-tight">
					{profile.name}
				</Text>
				<Text color="gray" className="leading-tight">
					@{profile.username}
				</Text>

				{/* Bio */}
				<Text className="my-3 block leading-snug">{profile.bio}</Text>

				{/* Info */}
				<Text as="div" color="gray" size="md" className="my-3 flex flex-wrap gap-3">
					{profile.location && (
						<span className="flex items-center gap-1">
							<span className="icon i-location" />
							{profile.location}
						</span>
					)}
					{profile.website && (
						<span className="flex items-center gap-1">
							<span className="icon i-link" />
							<a
								href={parseDomainToValidUrl(profile.website)}
								target="_blank"
								className="link"
								rel="noreferrer"
							>
								{profile.website}
							</a>
						</span>
					)}
					<span className="flex items-center gap-1">
						<span className="icon i-calendar" />
						{'Joined ' + formatUserCreatedDate(new Date(profile.created_at))}
					</span>
				</Text>

				{/* Stats */}
				<div className="my-3 flex gap-4">
					<Link to="following" className="hover:underline">
						<Text weight={7}>{profile.num_following}</Text> <Text color="gray">Following</Text>
					</Link>
					<Link to="followers" className="hover:underline">
						<Text weight={7}>{profile.num_followers}</Text> <Text color="gray">Followers</Text>
					</Link>
				</div>

				{/* Followers you know */}
				<SomeFollowersYouKnow />
			</div>

			{/* Tabs */}
			<Tabs
				list={[
					{ label: 'Posts', to: '', end: true },
					// TODO: implement replies & media tabs
					{ label: 'Replies', to: 'with_replies' },
					// { label: 'Media', to: 'media' },
					{ label: 'Likes', to: 'likes' },
				]}
			/>

			{/* Feed */}
			<Outlet />
		</div>
	)
}

const SomeFollowersYouKnow = () => {
	const profile = useProfile()
	if (profile.is_own || !profile.num_followers_you_know) return null
	let list = profile.some_followers_you_know.slice(0, 3)
	const count = profile.num_followers_you_know
	const text =
		count > 3
			? `${list.map((u) => u.name).join(', ')} and ${count - 3} others you follow`
			: new Intl.ListFormat('en-US').format(list.map((u) => u.name))
	return (
		<Link to="followers_you_follow" className="group my-3 flex items-center gap-3">
			<div className="flex -space-x-2.5">
				{profile.some_followers_you_know.map((follower, i) => (
					<Avatar
						key={follower.username}
						src={follower.avatarUrl}
						alt={follower.username}
						size="xs"
						className="bg-white ring ring-white"
						style={{ zIndex: i * -1 }}
					/>
				))}
			</div>
			<span className="text-gray group-hover:underline">Followed by {text}</span>
		</Link>
	)
}
