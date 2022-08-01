import { Tweet } from './tweet-card'

export type TweetsProps = {
	list: any[]
}

export const TweetList = ({ list: tweets }: TweetsProps) => {
	return (
		<div>
			{tweets.map((tweet) => (
				<Tweet tweet={tweet} key={tweet.id} />
			))}
		</div>
	)
}
