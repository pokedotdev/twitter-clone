CREATE MIGRATION m1zsq4f5qwmmnhg47ouc3wcillpfo5bcjmuuu6uxgfb2tlpjuewsmq
    ONTO m1fnfs7qealakxnsx77otl2kn2xqhbbcibtje552lqczklo4pox54q
{
  ALTER TYPE auth::Account {
      DROP CONSTRAINT std::exclusive ON ((.provider, .provider_id));
      ALTER LINK user {
          DROP CONSTRAINT std::exclusive;
      };
  };
  ALTER TYPE default::User {
      DROP LINK account;
  };
  DROP TYPE auth::Account;
  ALTER TYPE default::User {
      CREATE PROPERTY avatarUrl -> std::str;
      ALTER PROPERTY bio {
          DROP CONSTRAINT std::max_len_value(160);
          DROP CONSTRAINT std::min_len_value(1);
      };
  };
  ALTER TYPE default::User {
      CREATE PROPERTY coverUrl -> std::str;
  };
  ALTER TYPE default::User {
      CREATE PROPERTY location -> std::str;
  };
  ALTER TYPE default::User {
      DROP PROPERTY now;
  };
  ALTER TYPE default::User {
      CREATE REQUIRED PROPERTY provider -> tuple<name: std::str, id: std::str> {
          SET REQUIRED USING ((
              name := 'github',
              id := '123'
          ));
          CREATE CONSTRAINT std::exclusive;
      };
  };
  ALTER TYPE default::User {
      CREATE PROPERTY website -> std::str;
  };
  DROP MODULE auth;
};
