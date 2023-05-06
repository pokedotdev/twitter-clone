module default {

	global current_user_id: uuid;

	type User extending has::CreatedAt {
		required provider: tuple<name: str, id: str> {
			constraint exclusive;
		}
		required username: str {
			constraint exclusive;
			constraint expression on (__subject__ = str_trim(__subject__));
		}
		required name: str;
		bio: str;
		location: str;
		website: str;
		avatarUrl: str;
		coverUrl: str;

		multi following extending has::created_at -> User {
			on target delete allow;
		}
		multi link followers := .<following[is User];
		multi link followers_you_know := (select .followers filter User.followers in (
			select detached User filter .id = global current_user_id
		).following);
		multi link posts := .<user[is Post];
		multi link likes := .<user[is PostLike];

		property is_own := (.id ?= global current_user_id);
		property is_followed := (global current_user_id in .followers.id) ?? false;
		property num_following := count(.following);
		property num_followers := count(.followers);
		property num_followers_you_know := count(.followers_you_know);
		property num_posts := count(.posts);
	}

	type Post extending has::CreatedAt {
		required user: User { on target delete delete source; }
		body: str { constraint min_len_value(1); constraint max_len_value(280); }
		quote: Post { on target delete allow }
		repost: Post { on target delete delete source }
		replied_to: Post { on target delete allow }

		multi link likes := .<post[is PostLike];
		multi link quotes := .<quote[is Post];
		multi link reposts := .<repost[is Post];
		multi link replies := .<replied_to[is Post];

		property tag := str_split(.__type__.name, '::')[1];
		property is_own := (.user.id ?= global current_user_id);
		property is_liked := (global current_user_id in .likes.user.id) ?? false;
		property is_reposted := (global current_user_id in .reposts.user.id) ?? false;
		property num_likes := count(.likes);
		property num_reposts := count(.reposts);
		property num_replies := count(.replies);

		# constraint exclusive on ((.user, .body, .quote, .replied_to, .repost));
	}

	type PostLike extending has::CreatedAt {
		required user: User { on target delete delete source }
		required post: Post { on target delete delete source }
		constraint exclusive on ((.user, .post));
	}

}
