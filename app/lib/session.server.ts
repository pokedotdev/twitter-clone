import { createCookieSessionStorage } from '~/remix'

if (!process.env.COOKIE_SECRET) throw new Error('COOKIE_SECRET is required')

export const sessionStorage = createCookieSessionStorage({
	cookie: {
		name: '_session',
		httpOnly: true,
		path: '/',
		sameSite: 'lax',
		secrets: [process.env.COOKIE_SECRET],
		secure: process.env.NODE_ENV === 'production',
	},
})
