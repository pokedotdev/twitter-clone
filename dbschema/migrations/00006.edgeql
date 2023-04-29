CREATE MIGRATION m17mftvpbq76c42uqx2m2ze3fa4sdt7yyywowkli3bnjfszbyblsna
    ONTO m1i3de4crkdd6am7m6oxgcguodjldjxfwhksbz3rt7yuc7hnc7vkpa
{
  ALTER TYPE default::User {
      ALTER LINK followers_you_know {
          USING (SELECT
              .followers
          FILTER
              (default::User.followers IN ((SELECT
                  DETACHED default::User
              FILTER
                  (.id = GLOBAL default::current_user_id)
              )).following)
          );
      };
  };
  ALTER TYPE default::User {
      CREATE PROPERTY num_followers_you_know := (std::count(.followers_you_know));
      ALTER PROPERTY name {
          DROP CONSTRAINT std::max_len_value(50);
          DROP CONSTRAINT std::min_len_value(1);
      };
      ALTER PROPERTY username {
          DROP CONSTRAINT std::max_len_value(15);
          DROP CONSTRAINT std::min_len_value(4);
      };
  };
};
