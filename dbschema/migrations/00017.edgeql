CREATE MIGRATION m1vti2wibg2tzgonheneqzjxw6swr6ulboepzkhp2anvmvdc5edweq
    ONTO m1xtji4xrunxxtziuf3s5ixyrjkkroh62cjw2gvhcuvoy5pjcw64cq
{
  ALTER TYPE default::Post {
      ALTER LINK retweet {
          RENAME TO repost;
      };
  };
};
