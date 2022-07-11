export const icons = {
	logo: 'i-teenyicons-twitter-solid',
	home: 'i-ph-house',
	home_fill: 'i-ph-house-fill',
	hash: 'i-ph-hash',
	hash_fill: 'i-ph-hash-bold',
	user: 'i-ph-user',
	user_fill: 'i-ph-user-fill',
	dots: 'i-ph-dots-three-bold',
	message: 'i-ph-envelope',
	location: 'i-ph-map-pin',
	link: 'i-ph-link',
	calendar: 'i-ph-calendar-blank',
	comment: 'i-ph-chat-centered',
	retweet: 'i-ph-repeat',
	retweet_fill: 'i-ph-repeat-bold ',
	like: 'i-ph-heart',
	like_fill: 'i-ph-heart-fill',
	share: 'i-ph-share',
	arrow_left: 'i-ph-arrow-left',
	search: 'i-ph-magnifying-glass',
	pen: 'i-ph-pen-nib',
	close: 'i-ph-x',
	// Logos
	github: 'i-line-md-github-loop',
	// Responsive icons
	hash_to_search: 'i-ph-magnifying-glass lg:i-ph-hash',
	hash_to_search_fill: 'i-ph-magnifying-glass-bold lg:i-ph-hash-bold',
} as const

export type IconCollection = keyof typeof icons
