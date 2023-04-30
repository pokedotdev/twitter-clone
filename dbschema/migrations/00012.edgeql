CREATE MIGRATION m1ogshguw5rlu4jckopbynxurs2sigl3d46q3c6fehvbyhumiurbda
    ONTO m1xlo2mc7thynqle47dhozoryrnvtwu645j7xow4fg3kg5abumdmba
{
  ALTER TYPE default::Post {
      CREATE CONSTRAINT std::exclusive ON ((.user, .body, .quote, .replied_to, .retweet));
      CREATE MULTI LINK likes := (.<likes[IS default::User]);
      CREATE PROPERTY is_liked := (((GLOBAL default::current_user_id IN .likes.id) ?? false));
      CREATE PROPERTY num_likes := (std::count(.likes));
      CREATE MULTI LINK quotes := (.<quote[IS default::Post]);
      CREATE MULTI LINK replies := (.<replied_to[IS default::Post]);
      CREATE PROPERTY num_replies := (std::count(.replies));
      CREATE MULTI LINK retweets := (.<retweet[IS default::Post]);
      CREATE PROPERTY is_retweeted := (((GLOBAL default::current_user_id IN .retweets.user.id) ?? false));
      CREATE PROPERTY num_retweets := (std::count(.retweets));
      CREATE PROPERTY is_own := ((.user.id ?= GLOBAL default::current_user_id));
      CREATE PROPERTY tag := ((std::str_split(.__type__.name, '::'))[1]);
  };
};
