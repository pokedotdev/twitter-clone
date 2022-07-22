import { NavLink } from '@remix-run/react'
import type { NavLinkProps } from '@remix-run/react'
import cn from 'clsx'

import { useOptionalUser } from '~/utils'
import type { IconCollection } from '~/components'
import { Button, Icon } from '~/components'

export const NavList = () => {
	const user = useOptionalUser()
	return (
		<nav className="flex flex-auto justify-around gap-2 sm:my-1 sm:flex-col sm:justify-start xl:w-full">
			{user && (
				<NavButton to="/home" icon="home" iconActive="home_fill">
					Home
				</NavButton>
			)}

			<NavButton
				to="/explore"
				icon="hash_to_search"
				iconActive="hash_to_search_fill"
			>
				Explore
			</NavButton>

			{user && (
				<>
					<NavButton
						to={`/${user.username}`}
						icon="user"
						iconActive="user_fill"
					>
						Profile
					</NavButton>
					{/* Button New Tweet */}
					<div className="bottom-21 fixed right-5 sm:static sm:my-5 xl:w-11/12">
						<Button
							color="primary"
							size="xl"
							className="shadow-md sm:shadow-none xl:w-full"
							square
						>
							<span className="hidden text-xl xl:block">Tweet</span>
							<Icon name="pen" className="xl:hidden" size="xl" />
						</Button>
					</div>
				</>
			)}
		</nav>
	)
}

const NavButton = ({
	children,
	to,
	icon,
	iconActive,
}: {
	to: NavLinkProps['to']
	children: React.ReactNode
	icon: IconCollection
	iconActive?: IconCollection
}) => (
	<NavLink to={to} prefetch="intent">
		{({ isActive }) => (
			<Button
				as="div"
				variant="ghost"
				size="xl"
				icon={isActive && iconActive ? iconActive : icon}
				className="ring-6 !block w-16 ring-inset ring-white sm:ring-0 xl:!inline-flex xl:w-auto"
			>
				<span className={cn(!isActive && 'font-normal', 'hidden xl:block')}>
					{children}
				</span>
			</Button>
		)}
	</NavLink>
)
