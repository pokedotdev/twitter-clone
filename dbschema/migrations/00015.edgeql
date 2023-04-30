CREATE MIGRATION m1iqm2s4jphx3gs3mgzdmvobzkx5vafp3ggunuddfd6kzywsrvvmwa
    ONTO m1ttugkdejsrjd67rbw3jxcj5q7oa4ectuxbwlwmphkqeau3uleikq
{
  ALTER TYPE default::Post {
      ALTER LINK likes {
          USING (.<post[IS default::PostLike]);
      };
  };
  ALTER TYPE default::Post {
      ALTER PROPERTY is_liked {
          USING (((GLOBAL default::current_user_id IN .likes.user.id) ?? false));
      };
  };
  DROP TYPE default::Tweet;
  ALTER TYPE default::User {
      DROP LINK likes;
  };
  ALTER TYPE default::User {
      CREATE MULTI LINK likes := (.<user[IS default::PostLike]);
  };
};
