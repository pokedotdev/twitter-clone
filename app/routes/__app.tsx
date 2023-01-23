import { Link, Outlet } from '~/remix'

import { Button, ButtonProvider, FormAuth, NavList, AccountMenu, RouteHeader } from '~/components'
import { useOptionalUser } from '~/utils'

export default function App() {
	const user = useOptionalUser()

	return (
		<>
			<div className="flex justify-center">
				<div className="mdl:grid-cols-[auto_600px_minmax(auto,390px)] inline-grid grid-cols-[auto_minmax(auto,600px)]">
					{/* Header */}
					<div className="sticky top-0 z-10 col-start-1 row-start-1 flex h-16 flex-col justify-center px-0 sm:h-screen sm:items-center sm:px-[5px] md:px-3.5 xl:w-[275px] xl:items-start">
						{/* Logo */}
						<div className="hidden h-16 sm:block">
							<Link to={user ? '/home' : '/explore'} prefetch="intent">
								<Button
									as="div"
									variant="ghost"
									color="primary"
									size="xl"
									icon="logo"
									className="text-primary-500"
								/>
							</Link>
						</div>
						{/* Nav */}
						<div className="fixed bottom-0 flex h-16 w-full flex-auto flex-col border-t border-gray-200 bg-white sm:static sm:bottom-auto sm:h-auto sm:border-none">
							<NavList />
						</div>
						{/* Account */}
						{user && (
							<div className="relative w-full bg-white/80 backdrop-blur-lg sm:my-3.5">
								<AccountMenu />
							</div>
						)}
					</div>

					{/* Main */}
					<main className="col-span-full col-start-1 row-start-1 border-gray-200 sm:col-auto sm:col-start-2 sm:border-x">
						<RouteHeader />
						<Outlet />
					</main>
					{/* Sidebar */}
					<div className="lgx:pl-7.5 mdl:flex col-start-3 row-start-1 mb-12 hidden flex-col pl-5 pr-2.5">
						{/* display conditionally by page  */}
						<div className="sticky top-0 z-10 col-start-3 row-start-1 h-16 bg-white">Search</div>
						{/* get the list of widgets from helper matches */}
						<div className="sticky top-16">sidebar</div>
					</div>
				</div>
			</div>
			{/* show if not logged in */}
			{!user && <AuthBanner />}
		</>
	)
}

const AuthBanner = () => (
	<div className="bg-primary-500 fixed bottom-0 z-40 w-full py-4 px-6 text-white">
		<div className="mx-auto flex max-w-7xl items-center justify-center md:justify-between">
			<div className="hidden flex-col md:inline-flex">
				<span className="text-2xl font-bold">Don’t miss what’s happening</span>
				<span className="">People on Twitter are the first to know.</span>
			</div>

			<FormAuth className="flex max-w-xs flex-col gap-4">
				<ButtonProvider provider="github" color="white" />
			</FormAuth>
		</div>
	</div>
)
