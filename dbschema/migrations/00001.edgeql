CREATE MIGRATION m1fnfs7qealakxnsx77otl2kn2xqhbbcibtje552lqczklo4pox54q
    ONTO initial
{
  CREATE MODULE auth IF NOT EXISTS;
  CREATE TYPE auth::Account {
      CREATE PROPERTY provider -> std::str;
      CREATE PROPERTY provider_id -> std::str;
      CREATE CONSTRAINT std::exclusive ON ((.provider, .provider_id));
      CREATE PROPERTY email -> std::str;
  };
  CREATE ABSTRACT TYPE default::HasCreatedAt {
      CREATE PROPERTY created_at -> std::datetime {
          SET default := (SELECT
              std::datetime_current()
          );
          SET readonly := true;
      };
  };
  CREATE TYPE default::User EXTENDING default::HasCreatedAt {
      CREATE PROPERTY bio -> std::str {
          CREATE CONSTRAINT std::max_len_value(160);
          CREATE CONSTRAINT std::min_len_value(1);
      };
      CREATE REQUIRED PROPERTY name -> std::str {
          CREATE CONSTRAINT std::max_len_value(50);
          CREATE CONSTRAINT std::min_len_value(1);
      };
      CREATE PROPERTY now := (std::datetime_of_statement());
      CREATE REQUIRED PROPERTY username -> std::str {
          CREATE CONSTRAINT std::exclusive;
          CREATE CONSTRAINT std::expression ON ((__subject__ = std::str_trim(__subject__)));
          CREATE CONSTRAINT std::max_len_value(15);
          CREATE CONSTRAINT std::min_len_value(4);
      };
  };
  ALTER TYPE auth::Account {
      CREATE REQUIRED LINK user -> default::User {
          ON TARGET DELETE  DELETE SOURCE;
          CREATE CONSTRAINT std::exclusive;
      };
  };
  ALTER TYPE default::User {
      CREATE LINK account := (.<user[IS auth::Account]);
  };
  CREATE SCALAR TYPE default::TweetType EXTENDING enum<TWEET, RETWEET, REPLY>;
  CREATE TYPE default::Tweet EXTENDING default::HasCreatedAt {
      CREATE REQUIRED LINK user -> default::User {
          ON TARGET DELETE  DELETE SOURCE;
      };
      CREATE REQUIRED PROPERTY body -> std::str {
          CREATE CONSTRAINT std::max_len_value(280);
          CREATE CONSTRAINT std::min_len_value(1);
      };
      CREATE REQUIRED PROPERTY tweet_type -> default::TweetType;
  };
  ALTER TYPE default::User {
      CREATE MULTI LINK likes -> default::Tweet;
      CREATE MULTI LINK tweets := (default::User.<user[IS default::Tweet]);
  };
  ALTER TYPE default::Tweet {
      CREATE MULTI LINK likes := (default::Tweet.<likes[IS default::User]);
  };
};
