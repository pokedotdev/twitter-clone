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
		multi link tweets := .<user[is Post];
		multi link likes := .<user[is PostLike];

		property is_own := (.id ?= global current_user_id);
		property is_followed := (global current_user_id in .followers.id) ?? false;
		property num_following := count(.following);
		property num_followers := count(.followers);
		property num_followers_you_know := count(.followers_you_know);
		property num_tweets := count(.tweets);
	}

	type Post extending has::CreatedAt {
		required link user -> User { on target delete delete source; }
		property body -> str { constraint min_len_value(1); constraint max_len_value(280); }
		link quote -> Post { on target delete allow }
		link retweet -> Post { on target delete delete source }
		link replied_to -> Post { on target delete allow }

		multi link likes := .<post[is PostLike];
		multi link quotes := .<quote[is Post];
		multi link retweets := .<retweet[is Post];
		multi link replies := .<replied_to[is Post];

		property tag := str_split(.__type__.name, '::')[1];
		property is_own := (.user.id ?= global current_user_id);
		property is_liked := (global current_user_id in .likes.user.id) ?? false;
		property is_retweeted := (global current_user_id in .retweets.user.id) ?? false;
		property num_likes := count(.likes);
		property num_retweets := count(.retweets);
		property num_replies := count(.replies);

		# constraint exclusive on ((.user, .body, .quote, .replied_to, .retweet));
	}

	type PostLike extending has::CreatedAt {
		required link user -> User { on target delete delete source }
		required link post -> Post { on target delete delete source }
		constraint exclusive on ((.user, .post));
	}

}
