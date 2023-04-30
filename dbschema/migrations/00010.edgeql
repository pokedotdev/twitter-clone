CREATE MIGRATION m127br77vqy5qygjrj2vhnx4anykhzlnet2if2kd63ac2nr7nkfska
    ONTO m1my6hffnny5avw5lycuj2atyflglehrmpgthkvc6mmyjgwxlkar2q
{
  ALTER TYPE default::BaseTweet {
      DROP CONSTRAINT std::exclusive ON ((.user, .body, .quote, .replied_to, .retweet));
      DROP PROPERTY is_liked;
      DROP PROPERTY num_likes;
      DROP LINK likes;
      DROP LINK quotes;
      DROP PROPERTY num_replies;
      DROP LINK replies;
      DROP PROPERTY is_retweeted;
      DROP PROPERTY num_retweets;
      DROP LINK retweets;
      DROP PROPERTY is_own;
      DROP PROPERTY tag;
  };
};
