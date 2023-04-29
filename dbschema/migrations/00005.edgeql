CREATE MIGRATION m1i3de4crkdd6am7m6oxgcguodjldjxfwhksbz3rt7yuc7hnc7vkpa
    ONTO m15up42yzxfp7zjb7txaxmp44ecx3orili2vqygmmlnhst27l55lda
{
  ALTER TYPE default::User {
      CREATE MULTI LINK followers_you_know := (SELECT
          .followers
      FILTER
          (default::User IN (SELECT
              default::User.following
          FILTER
              (.id = GLOBAL default::current_user_id)
          ))
      );
  };
};
