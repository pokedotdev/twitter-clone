import * as React from 'react'
import { useMatches } from '~/remix'

import type { User } from '~/lib/db.server'
import type { RootLoaderType, UserProfileLoaderType } from '~/types/routes'

/**
 * This base hook is used in other hooks to quickly search for specific data
 * across all loader data using useMatches.
 */
export function useMatchesData<T>(routeId: string) {
	const matchingRoutes = useMatches()
	const route = React.useMemo(
		() => matchingRoutes.find((route) => route.id === routeId),
		[matchingRoutes, routeId],
	)
	return route?.data as unknown as T
}

function isUser(user: any): user is User {
	return user && typeof user === 'object' && typeof user.id === 'string'
}

export function useOptionalUser() {
	const data = useMatchesData<RootLoaderType>('root')
	if (!data || !isUser(data.user)) return undefined
	return data.user
}

export function useUser() {
	const maybeUser = useOptionalUser()
	if (!maybeUser)
		throw new Error(
			'No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead.',
		)
	return maybeUser
}

export function useOptionalProfile() {
	const data = useMatchesData<UserProfileLoaderType>('routes/__app/$user')
	if (!data || !isUser(data.profile)) return undefined
	return data.profile
}

export function useProfile() {
	const maybeProfile = useOptionalProfile()
	if (!maybeProfile)
		throw new Error(
			'No profile found in $user loader, but user is required by useProfile. If profile is optional, try useOptionalProfile instead.',
		)
	return maybeProfile
}

export function formatUserCreatedDate(created_at: Date) {
	return new Intl.DateTimeFormat('en-US', {
		month: 'long',
		year: 'numeric',
	}).format(created_at)
}

export const MS = {
	SECOND: 1000,
	MINUTE: 1000 * 60,
	HOUR: 1000 * 60 * 60,
	DAY: 1000 * 60 * 60 * 24,
} as const

export function getTimeSinceTweet(tweetDate: Date): string {
	const currentDate = new Date()
	const diff = currentDate.getTime() - tweetDate.getTime()

	if (diff < MS.SECOND) return '1s'
	if (diff < MS.MINUTE) return Math.floor(diff / MS.SECOND) + 's'
	if (diff < MS.HOUR) return Math.floor(diff / MS.MINUTE) + 'm'
	if (diff < MS.DAY) return Math.floor(diff / MS.HOUR) + 'h'

	const isCurrentYear = tweetDate.getFullYear() === currentDate.getFullYear()
	const options: Intl.DateTimeFormatOptions = {
		month: 'short',
		day: 'numeric',
		year: isCurrentYear ? undefined : 'numeric',
	}
	return new Intl.DateTimeFormat('en-US', options).format(tweetDate)
}

export function removeExtraBreakLines(text: string) {
	return text.replace(/\n\s*\n\s*\n/g, '\n\n')
}

export function parseDomainToValidUrl(domain: string) {
	return !domain.startsWith('http') ? `http://${domain}` : domain
}
