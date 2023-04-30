CREATE MIGRATION m1kb4aoethmmsi6yq7vwjlscvn73cc3jvqp44rkg3onfbzpvmxr4ia
    ONTO m1ymsgualatuvduhomzpp667jkgzvynwvxp6i4vhesxznrjo5r5yca
{
  ALTER TYPE default::BaseTweet {
      DROP CONSTRAINT std::exclusive ON ((.user, .body, .quote));
  };
  ALTER TYPE default::BaseTweet {
      CREATE MULTI LINK quotes := (.<quote[IS default::BaseTweet]);
  };
  ALTER TYPE default::BaseTweet {
      CREATE LINK replied_to -> default::BaseTweet {
          ON TARGET DELETE ALLOW;
      };
  };
  ALTER TYPE default::BaseTweet {
      DROP PROPERTY num_replies;
  };
  ALTER TYPE default::BaseTweet {
      DROP LINK replies;
  };
  ALTER TYPE default::BaseTweet {
      CREATE LINK retweet -> default::BaseTweet {
          ON TARGET DELETE DELETE SOURCE;
      };
  };
  ALTER TYPE default::BaseTweet {
      ALTER LINK retweets {
          USING (.<retweet[IS default::BaseTweet]);
      };
  };
  DROP TYPE default::Reply;
  DROP TYPE default::Retweet;
};
