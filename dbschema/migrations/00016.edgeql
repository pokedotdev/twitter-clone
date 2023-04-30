CREATE MIGRATION m1xtji4xrunxxtziuf3s5ixyrjkkroh62cjw2gvhcuvoy5pjcw64cq
    ONTO m1iqm2s4jphx3gs3mgzdmvobzkx5vafp3ggunuddfd6kzywsrvvmwa
{
  ALTER TYPE default::Post {
      DROP CONSTRAINT std::exclusive ON ((.user, .body, .quote, .replied_to, .retweet));
  };
};
