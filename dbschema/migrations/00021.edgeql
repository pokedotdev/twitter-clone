CREATE MIGRATION m1lipukcfeuzxuamcujgjdhk6rgoko5l6oz7kxd5nft5qtpgsb3dcq
    ONTO m1gndr7iy3kqmqecduqdkkdkxuwym3d2m7fnslxibwb6pcjapozf7q
{
  ALTER TYPE default::Post {
      ALTER LINK parent {
          RENAME TO p;
      };
  };
  ALTER TYPE default::User {
      ALTER PROPERTY username {
          DROP CONSTRAINT std::expression ON ((__subject__ = std::str_trim(__subject__)));
      };
  };
};
