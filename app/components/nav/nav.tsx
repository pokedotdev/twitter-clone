import { NavLink } from '~/remix'
import type { NavLinkProps } from '~/remix'

import { useOptionalUser } from '~/utils'
import { PostForm, Dialog } from '~/components'

export const NavList = () => {
	const user = useOptionalUser()
	return (
		<div className="flex flex-auto items-center gap-1 sm:my-1 sm:flex-col sm:justify-start xl:w-full xl:items-start">
			<nav className="flex w-full justify-around gap-2 sm:w-auto sm:flex-col sm:gap-0 xl:items-start">
				{user && (
					<NavButton to="/home" icon="i-home group-[[aria-current=page]]:i-home_fill">
						Home
					</NavButton>
				)}

				<NavButton
					to="/explore"
					icon="i-search group-[[aria-current=page]]:i-search_fill lg:i-hash lg:group-[[aria-current=page]]:i-hash_fill"
				>
					Explore
				</NavButton>

				{user && (
					<NavButton to={`/${user.username}`} icon="i-user group-[[aria-current=page]]:i-user_fill">
						Profile
					</NavButton>
				)}
			</nav>
			{/* Button New Post */}
			{user && (
				<div className="bottom-21 fixed right-5 sm:static sm:my-5 xl:w-11/12">
					<PostButton />
				</div>
			)}
		</div>
	)
}

const NavButton = (props: { to: NavLinkProps['to']; children: React.ReactNode; icon: string }) => (
	<NavLink
		to={props.to}
		prefetch="intent"
		className="btn solid light group h-16 p-0 text-2xl font-normal [&[aria-current=page]]:font-bold"
	>
		<span className={`icon ${props.icon} text-3xl`} />
		<span className="hidden pr-6 xl:block">{props.children}</span>
	</NavLink>
)

const PostButton = () => {
	const dialog = Dialog.useDialog()
	return (
		<>
			<button
				onClick={dialog.toggle}
				className="btn solid primary aspect-square h-16 p-0 text-xl font-bold shadow sm:shadow-none xl:aspect-auto xl:w-full"
			>
				<div className="icon i-pen text-3xl xl:hidden" />
				<span className="hidden text-xl xl:block">Compose</span>
			</button>
			<Dialog.Content store={dialog}>
				<Dialog.Header />
				<PostForm onSuccess={() => dialog.setOpen(false)} />
			</Dialog.Content>
		</>
	)
}
