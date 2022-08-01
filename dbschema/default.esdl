module default {

	abstract type HasCreatedAt {
		property created_at -> datetime {
			default := datetime_current();
			readonly := true;
		}	
	}

	global current_user_id -> uuid;
	global current_user := (select User filter .id ?= global current_user_id);

	type User extending HasCreatedAt {
		required property provider -> tuple<name: str, id: str> {
			constraint exclusive;
		}
		required property username -> str {
			constraint exclusive;
			constraint min_len_value(4);
			constraint max_len_value(15);
			constraint expression on (__subject__ = str_trim(__subject__));
		}
		required property name -> str {
			constraint min_len_value(1);
			constraint max_len_value(50);
		}
		property bio -> str;
		property location -> str;
		property website -> str;
		property avatarUrl -> str;
		property coverUrl -> str;

		multi link following -> User {
			property created_at -> datetime {
				default := datetime_current();
				readonly := true;
			}
		};
		multi link followers := .<following[is User];
		multi link tweets := .<user[is Tweet];
		multi link likes -> Tweet {
			property created_at -> datetime {
				default := datetime_current();
				readonly := true;
			} 
		}

		property is_own := (.id ?= global current_user_id);
	}

	scalar type TweetType extending enum<TWEET, RETWEET, REPLY>;

	type Tweet extending HasCreatedAt {
		required property body -> str {
			constraint min_len_value(1);
			constraint max_len_value(280);
		}
		required property tweet_type -> TweetType;
	
		multi link likes := .<likes[is User];
		required link user -> User;

		property is_own := (.user.id ?= global current_user_id);
		property num_likes := count(.likes);
	}

}