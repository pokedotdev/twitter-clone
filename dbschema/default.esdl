module default {

	abstract type HasCreatedAt {
		property created_at -> datetime {
			default := (SELECT datetime_current());
			readonly := true;
		}	
	}

	type User extending HasCreatedAt {
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
		property bio -> str {
			constraint min_len_value(1);
			constraint max_len_value(160);
		}
		property now := datetime_of_statement();

		link account := .<user[IS auth::Account];
		# todo: tweets = only tweets & retweets
		multi link tweets := User.<user[IS Tweet];
		# todo: add created_at to likes
		multi link likes -> Tweet;
		# retweets & replies
		# media tweets
	}

	scalar type TweetType extending enum<TWEET, RETWEET, REPLY>;

	type Tweet extending HasCreatedAt {
		required property body -> str {
			constraint min_len_value(1);
			constraint max_len_value(280);
		}
		required property tweet_type -> TweetType;

		multi link likes := Tweet.<likes[IS User];
		required link user -> User {
    	on target delete delete source;
		}
	}

}