CREATE MIGRATION m14orkdrxfm6qtbwo2anueqpdoomdpvbpfuxdzdhicbwamnoxmohxa
    ONTO initial
{
  CREATE GLOBAL default::current_user_id -> std::uuid;
  CREATE ABSTRACT TYPE default::HasCreatedAt {
      CREATE PROPERTY created_at -> std::datetime {
          SET default := (std::datetime_current());
          SET readonly := true;
      };
  };
  CREATE TYPE default::User EXTENDING default::HasCreatedAt {
      CREATE MULTI LINK following -> default::User {
          CREATE PROPERTY created_at -> std::datetime {
              SET default := (std::datetime_current());
              SET readonly := true;
          };
      };
      CREATE MULTI LINK followers := (.<following[IS default::User]);
      CREATE PROPERTY avatarUrl -> std::str;
      CREATE PROPERTY bio -> std::str;
      CREATE PROPERTY coverUrl -> std::str;
      CREATE PROPERTY is_own := ((.id ?= GLOBAL default::current_user_id));
      CREATE PROPERTY location -> std::str;
      CREATE REQUIRED PROPERTY name -> std::str {
          CREATE CONSTRAINT std::max_len_value(50);
          CREATE CONSTRAINT std::min_len_value(1);
      };
      CREATE REQUIRED PROPERTY provider -> tuple<name: std::str, id: std::str> {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY username -> std::str {
          CREATE CONSTRAINT std::exclusive;
          CREATE CONSTRAINT std::expression ON ((__subject__ = std::str_trim(__subject__)));
          CREATE CONSTRAINT std::max_len_value(15);
          CREATE CONSTRAINT std::min_len_value(4);
      };
      CREATE PROPERTY website -> std::str;
  };
  CREATE GLOBAL default::current_user := (SELECT
      default::User
  FILTER
      (.id ?= GLOBAL default::current_user_id)
  );
  CREATE SCALAR TYPE default::TweetType EXTENDING enum<TWEET, RETWEET, REPLY>;
  CREATE TYPE default::Tweet EXTENDING default::HasCreatedAt {
      CREATE REQUIRED LINK user -> default::User;
      CREATE PROPERTY is_own := ((.user.id ?= GLOBAL default::current_user_id));
      CREATE REQUIRED PROPERTY body -> std::str {
          CREATE CONSTRAINT std::max_len_value(280);
          CREATE CONSTRAINT std::min_len_value(1);
      };
      CREATE REQUIRED PROPERTY tweet_type -> default::TweetType;
  };
  ALTER TYPE default::User {
      CREATE MULTI LINK likes -> default::Tweet {
          CREATE PROPERTY created_at -> std::datetime {
              SET default := (std::datetime_current());
              SET readonly := true;
          };
      };
      CREATE MULTI LINK tweets := (.<user[IS default::Tweet]);
  };
  ALTER TYPE default::Tweet {
      CREATE MULTI LINK likes := (.<likes[IS default::User]);
      CREATE PROPERTY is_liked := ((GLOBAL default::current_user IN .likes));
      CREATE PROPERTY num_likes := (std::count(.likes));
  };
};
