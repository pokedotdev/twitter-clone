import { Tweet } from './tweet'

export type TweetsProps = {
	list: any[]
}

export const Tweets = ({ list: tweets }: TweetsProps) => {
	return (
		<div>
			{tweets.map((tweet) => (
				<Tweet tweet={tweet} key={tweet.id} />
			))}
		</div>
	)
}
