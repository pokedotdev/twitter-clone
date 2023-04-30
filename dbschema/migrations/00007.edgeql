CREATE MIGRATION m1ymsgualatuvduhomzpp667jkgzvynwvxp6i4vhesxznrjo5r5yca
    ONTO m17mftvpbq76c42uqx2m2ze3fa4sdt7yyywowkli3bnjfszbyblsna
{
  ALTER TYPE default::BaseTweet {
      CREATE CONSTRAINT std::exclusive ON ((.user, .body, .quote));
  };
  ALTER TYPE default::Tweet {
      ALTER CONSTRAINT std::exclusive ON ((.user, .body, .quote)) {
          DROP OWNED;
      };
  };
};
