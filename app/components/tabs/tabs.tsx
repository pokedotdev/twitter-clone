import type { NavLinkProps } from '~/remix'
import { NavLink } from '~/remix'
import cn from 'clsx'

import { Text } from '~/components'

type TabProps = {
	label: string
} & Exclude<NavLinkProps, 'children'>

export type TabsProps = {
	list: TabProps[]
} & React.ComponentProps<'div'>

export const Tabs = ({ list, className, ...rest }: TabsProps) => {
	const classes = cn(
		'no-scrollbar flex h-16 w-full snap-x snap-mandatory flex-col flex-wrap items-stretch overflow-x-auto overflow-y-hidden border-b border-gray-200 bg-white/80 backdrop-blur-lg',
		className
	)
	return (
		<div className={classes} {...rest}>
			{list.map(({ label, to, ...rest }) => (
				<Tab key={label} to={to} {...rest}>
					{label}
				</Tab>
			))}
		</div>
	)
}

const Tab = ({ children, ...rest }: NavLinkProps) => {
	return (
		<NavLink
			prefetch="intent"
			className="grid snap-start place-items-center px-5 hover:bg-gray-100"
			{...rest}
		>
			{({ isActive }) => (
				<div className="relative grid h-16 place-items-center">
					<Text
						weight={isActive ? 7 : 5}
						color={isActive ? undefined : 'gray'}
						className="whitespace-nowrap"
					>
						{children}
					</Text>
					{isActive && (
						<div className="bg-primary-500 absolute bottom-0 h-1 w-full rounded-full" />
					)}
				</div>
			)}
		</NavLink>
	)
}
