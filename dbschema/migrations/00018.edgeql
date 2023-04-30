CREATE MIGRATION m1u6iz2nbjxtbmydzvmwxcmaufuubyzc57sggslmvv7jdh5gzepwmq
    ONTO m1vti2wibg2tzgonheneqzjxw6swr6ulboepzkhp2anvmvdc5edweq
{
  ALTER TYPE default::Post {
      ALTER LINK retweets {
          RENAME TO reposts;
      };
  };
  ALTER TYPE default::Post {
      ALTER PROPERTY is_retweeted {
          RENAME TO is_reposted;
      };
  };
  ALTER TYPE default::Post {
      ALTER PROPERTY num_retweets {
          RENAME TO num_reposts;
      };
  };
  ALTER TYPE default::User {
      ALTER LINK tweets {
          RENAME TO posts;
      };
  };
  ALTER TYPE default::User {
      ALTER PROPERTY num_tweets {
          RENAME TO num_posts;
      };
  };
};
