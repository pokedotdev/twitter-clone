CREATE MIGRATION m1uudrnymrfnbbeslswl2sv3vug6wwb2antnt4rxeu756ex3rptiya
    ONTO m166hqmp3nflwgwigy7lz6ejuc5pvx6fwnv4dqk6zaamarvksnr7yq
{
  ALTER TYPE default::BaseTweet {
      CREATE LINK quote -> default::BaseTweet {
          ON TARGET DELETE ALLOW;
      };
  };
  ALTER TYPE default::Reply {
      CREATE REQUIRED LINK replied_to -> default::BaseTweet {
          ON TARGET DELETE DELETE SOURCE;
          SET REQUIRED USING (SELECT
              default::Tweet 
          LIMIT
              1
          );
      };
  };
  ALTER TYPE default::BaseTweet {
      CREATE MULTI LINK replies := (.<replied_to[IS default::Reply]);
  };
  ALTER TYPE default::BaseTweet {
      CREATE MULTI LINK retweets := (.<quote[IS default::BaseTweet]);
  };
  ALTER TYPE default::BaseTweet {
      ALTER LINK user {
          ON TARGET DELETE DELETE SOURCE;
      };
  };
  ALTER TYPE default::BaseTweet {
      CREATE PROPERTY is_retweeted := (((GLOBAL default::current_user_id IN .retweets.user.id) ?? false));
  };
  ALTER TYPE default::BaseTweet {
      CREATE PROPERTY num_replies := (std::count(.replies));
  };
  ALTER TYPE default::BaseTweet {
      CREATE PROPERTY num_retweets := (std::count(.retweets));
  };
  CREATE TYPE default::Retweet EXTENDING default::BaseTweet {
      ALTER LINK quote {
          ON TARGET DELETE DELETE SOURCE;
          SET OWNED;
          SET REQUIRED;
          SET TYPE default::BaseTweet;
      };
      CREATE CONSTRAINT std::exclusive ON ((.user, .quote));
  };
  ALTER TYPE default::Reply {
      DROP CONSTRAINT std::exclusive ON ((.user, .body, .tweet));
  };
  ALTER TYPE default::BaseTweet {
      DROP LINK tweet;
  };
  ALTER TYPE default::Reply {
      CREATE CONSTRAINT std::exclusive ON ((.user, .body, .quote, .replied_to));
  };
  ALTER TYPE default::Tweet {
      CREATE CONSTRAINT std::exclusive ON ((.user, .body, .quote));
  };
  ALTER TYPE default::Tweet {
      DROP CONSTRAINT std::exclusive ON ((.user, .body));
  };
};
