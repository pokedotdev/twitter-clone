CREATE MIGRATION m166hqmp3nflwgwigy7lz6ejuc5pvx6fwnv4dqk6zaamarvksnr7yq
    ONTO m1a3rawq2phpptkj25gbrnesp7whp432zcjj72wo3aqorl2j7crmva
{
  CREATE MODULE has IF NOT EXISTS;
  DROP GLOBAL default::current_user;
  CREATE ABSTRACT LINK has::created_at {
      CREATE PROPERTY created_at -> std::datetime {
          SET default := (std::datetime_current());
          SET readonly := true;
      };
  };
  ALTER TYPE default::User {
      ALTER LINK following {
          ON TARGET DELETE ALLOW;
          EXTENDING has::created_at LAST;
      };
  };
  ALTER TYPE default::HasCreatedAt RENAME TO has::CreatedAt;
  CREATE ABSTRACT TYPE default::BaseTweet EXTENDING has::CreatedAt {
      CREATE LINK tweet -> default::BaseTweet;
      CREATE REQUIRED LINK user -> default::User;
      CREATE PROPERTY body -> std::str {
          CREATE CONSTRAINT std::max_len_value(280);
          CREATE CONSTRAINT std::min_len_value(1);
      };
      CREATE PROPERTY is_own := ((.user.id ?= GLOBAL default::current_user_id));
      CREATE PROPERTY tag := ((std::str_split(.__type__.name, '::'))[1]);
  };
  CREATE TYPE default::Reply EXTENDING default::BaseTweet {
      CREATE CONSTRAINT std::exclusive ON ((.user, .body, .tweet));
  };
  ALTER TYPE default::Tweet {
      DROP PROPERTY num_likes;
  };
  ALTER TYPE default::Tweet {
      DROP LINK likes;
  };
  ALTER TYPE default::Tweet {
      DROP PROPERTY is_own;
  };
  ALTER TYPE default::Tweet {
      DROP PROPERTY tweet_type;
      DROP EXTENDING has::CreatedAt;
      EXTENDING default::BaseTweet LAST;
  };
  ALTER TYPE default::User {
      ALTER LINK tweets {
          USING (.<user[IS default::BaseTweet]);
      };
  };
  ALTER TYPE default::Tweet {
      ALTER LINK user {
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
      ALTER PROPERTY body {
          ALTER CONSTRAINT std::max_len_value(280) {
              DROP OWNED;
          };
      };
  };
  ALTER TYPE default::User {
      CREATE PROPERTY num_tweets := (std::count(.tweets));
      ALTER LINK likes {
          EXTENDING has::created_at LAST;
      };
  };
  ALTER TYPE default::Tweet {
      ALTER PROPERTY body {
          RESET OPTIONALITY;
          ALTER CONSTRAINT std::min_len_value(1) {
              DROP OWNED;
          };
          DROP OWNED;
          RESET TYPE;
      };
  };
  ALTER TYPE default::Tweet {
      CREATE CONSTRAINT std::exclusive ON ((.user, .body));
  };
  ALTER TYPE default::User {
      ALTER LINK likes {
          ON TARGET DELETE ALLOW;
          SET TYPE default::BaseTweet;
      };
      ALTER LINK following {
          ALTER PROPERTY created_at {
              DROP OWNED;
              RESET TYPE;
          };
      };
  };
  ALTER TYPE default::User {
      ALTER LINK likes {
          ALTER PROPERTY created_at {
              DROP OWNED;
              RESET TYPE;
          };
      };
  };
  ALTER TYPE default::User {
      CREATE PROPERTY is_followed := (((GLOBAL default::current_user_id IN .followers.id) ?? false));
  };
  ALTER TYPE default::User {
      CREATE PROPERTY num_followers := (std::count(.followers));
  };
  ALTER TYPE default::User {
      CREATE PROPERTY num_following := (std::count(.following));
  };
  DROP SCALAR TYPE default::TweetType;
	ALTER TYPE default::BaseTweet {
      CREATE MULTI LINK likes := (.<likes[IS default::User]);
      CREATE PROPERTY is_liked := (((GLOBAL default::current_user_id IN .likes.id) ?? false));
      CREATE PROPERTY num_likes := (std::count(.likes));
  };
};
