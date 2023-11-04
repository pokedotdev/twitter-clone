import { useRouteLoaderData } from '@remix-run/react'

import type { User } from '~/lib/db.server'
import type { RootLoaderType, UserProfileLoaderType } from '~/types/routes'

function isUser(user: any): user is User {
	return user && typeof user === 'object' && typeof user.id === 'string'
}

export function useOptionalUser() {
	const data = useRouteLoaderData<RootLoaderType>('root')
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
	const data = useRouteLoaderData<UserProfileLoaderType>('routes/_app.$user')
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

export function getTimeSincePost(postDate: Date): string {
	const currentDate = new Date()
	const diff = currentDate.getTime() - postDate.getTime()

	if (diff < MS.SECOND) return '1s'
	if (diff < MS.MINUTE) return Math.floor(diff / MS.SECOND) + 's'
	if (diff < MS.HOUR) return Math.floor(diff / MS.MINUTE) + 'm'
	if (diff < MS.DAY) return Math.floor(diff / MS.HOUR) + 'h'

	const isCurrentYear = postDate.getFullYear() === currentDate.getFullYear()
	const options: Intl.DateTimeFormatOptions = {
		month: 'short',
		day: 'numeric',
		year: isCurrentYear ? undefined : 'numeric',
	}
	return new Intl.DateTimeFormat('en-US', options).format(postDate)
}

export function formatPostDate(postDate: Date): string {
	return new Date(postDate).toLocaleString('en-US', {
		hour: 'numeric',
		minute: '2-digit',
		hour12: true,
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})
}

export function removeExtraBreakLines(text: string) {
	return text.replace(/\n\s*\n\s*\n/g, '\n\n')
}

export function parseDomainToValidUrl(domain: string) {
	return !domain.startsWith('http') ? `http://${domain}` : domain
}
