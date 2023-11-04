import { useMatches } from '@remix-run/react'

import { Text } from '~/components'

type Header = {
	title?: string
	subtitle?: string
}

type RouteWithHeader = {
	data: { header?: Header }
	handle: { header?: Header }
}

function useHeader() {
	const matches = useMatches() as RouteWithHeader[]
	const match = matches.reverse().find((match) => match.data?.header || match.handle?.header)
	return match?.data?.header || match?.handle?.header
}

export const RouteHeader = () => {
	const header = useHeader()

	return header ? (
		<div className="sticky top-0 z-20 col-start-2 row-start-1 flex h-16 items-center bg-white/80 px-5 backdrop-blur-lg">
			<div>
				{header?.title && (
					<Text as="h2" size="xl" weight={7} className="leading-none">
						{header.title}
					</Text>
				)}
				{header?.subtitle && (
					<Text size="sm" color="gray">
						{header.subtitle}
					</Text>
				)}
			</div>
		</div>
	) : null
}
