CREATE MIGRATION m1my6hffnny5avw5lycuj2atyflglehrmpgthkvc6mmyjgwxlkar2q
    ONTO m1kb4aoethmmsi6yq7vwjlscvn73cc3jvqp44rkg3onfbzpvmxr4ia
{
  ALTER TYPE default::BaseTweet {
      CREATE CONSTRAINT std::exclusive ON ((.user, .body, .quote, .replied_to, .retweet));
      CREATE MULTI LINK replies := (.<replied_to[IS default::BaseTweet]);
      CREATE PROPERTY num_replies := (std::count(.replies));
  };
};
