module default {

	global current_user_id -> uuid;

	type User extending has::CreatedAt {
		required property provider -> tuple<name: str, id: str> {
			constraint exclusive;
		}
		required property username -> str {
			constraint exclusive;
			constraint expression on (__subject__ = str_trim(__subject__));
		}
		required property name -> str;
		property bio -> str;
		property location -> str;
		property website -> str;
		property avatarUrl -> str;
		property coverUrl -> str;

		multi link following extending has::created_at -> User {
			on target delete allow;
		}
		multi link followers := .<following[is User];
		multi link followers_you_know := (select .followers filter User.followers in (
			select detached User filter .id = global current_user_id
		).following);
		multi link tweets := .<user[is BaseTweet];
		multi link likes extending has::created_at -> BaseTweet {
			on target delete allow;
		}

		property is_own := (.id ?= global current_user_id);
		property is_followed := (global current_user_id in .followers.id) ?? false;
		property num_following := count(.following);
		property num_followers := count(.followers);
		property num_followers_you_know := count(.followers_you_know);
		property num_tweets := count(.tweets);
	}

	abstract type BaseTweet extending has::CreatedAt {
		property body -> str {
			constraint min_len_value(1);
			constraint max_len_value(280);
		}

		required link user -> User {
			on target delete delete source;
		}
		link quote -> BaseTweet {
			on target delete allow;
		}
		multi link likes := .<likes[is User];
		multi link retweets := .<quote[is BaseTweet];
		multi link replies := .<replied_to[is Reply];

		property tag := str_split(.__type__.name, '::')[1];
		property is_own := (.user.id ?= global current_user_id);
		property is_liked := (global current_user_id in .likes.id) ?? false;
		property is_retweeted := (global current_user_id in .retweets.user.id) ?? false;
		property num_likes := count(.likes);
		property num_retweets := count(.retweets);
		property num_replies := count(.replies);
	}

	type Tweet extending BaseTweet {
		constraint exclusive on ((.user, .body, .quote));
	}

	type Retweet extending BaseTweet {
		overloaded required link quote -> BaseTweet {
			on target delete delete source;
		}
		constraint exclusive on ((.user, .quote));
	}

	type Reply extending BaseTweet {
		required link replied_to -> BaseTweet {
			on target delete delete source;
		}
		constraint exclusive on ((.user, .body, .quote, .replied_to));
	}

}
