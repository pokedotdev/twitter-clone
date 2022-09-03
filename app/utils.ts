import * as React from 'react'
import { useMatches } from '~/remix'

import type { User } from '~/db.server'
import type { RootLoaderType, UserProfileLoaderType } from '~/types/routes'

const DEFAULT_REDIRECT = '/'

/**
 * This should be used any time the redirect path is user-provided
 * (Like the query string on our login/signup pages). This avoids
 * open-redirect vulnerabilities.
 * @param {string} to The redirect destination
 * @param {string} defaultRedirect The redirect to use if the to is unsafe.
 */
export function safeRedirect(
	to: FormDataEntryValue | string | null | undefined,
	defaultRedirect: string = DEFAULT_REDIRECT
) {
	if (!to || typeof to !== 'string') {
		return defaultRedirect
	}

	if (!to.startsWith('/') || to.startsWith('//')) {
		return defaultRedirect
	}

	return to
}

/**
 * This base hook is used in other hooks to quickly search for specific data
 * across all loader data using useMatches.
 */
export function useMatchesData<T>(routeId: string) {
	const matchingRoutes = useMatches()
	const route = React.useMemo(
		() => matchingRoutes.find((route) => route.id === routeId),
		[matchingRoutes, routeId]
	)
	return route?.data as unknown as T
}

function isUser(user: any): user is User {
	return user && typeof user === 'object' && typeof user.id === 'string'
}

export function useOptionalUser() {
	const { data } = useMatchesData<RootLoaderType>('root')
	if (!data || !isUser(data.user)) return undefined
	return data.user
}

export function useUser() {
	const maybeUser = useOptionalUser()
	if (!maybeUser)
		throw new Error(
			'No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead.'
		)
	return maybeUser
}

export function useOptionalProfile() {
	const { data } = useMatchesData<UserProfileLoaderType>('routes/__app/$user')
	if (!data || !isUser(data.profile)) return undefined
	return data.profile
}

export function useProfile() {
	const maybeProfile = useOptionalProfile()
	if (!maybeProfile)
		throw new Error(
			'No profile found in $user loader, but user is required by useProfile. If profile is optional, try useOptionalProfile instead.'
		)
	return maybeProfile
}

export function formatUserCreatedDate(created_at: Date) {
	return new Intl.DateTimeFormat('en-US', {
		month: 'long',
		year: 'numeric',
	}).format(created_at)
}

export function removeExtraBreakLines(text: string) {
	return text.replace(/\n\s*\n\s*\n/g, '\n\n')
}

export function parseDomainToValidUrl(domain: string) {
	return !domain.startsWith('http') ? `http://${domain}` : domain
}
