CREATE MIGRATION m17lnm2ufzxovdpo7deysmc75apr5ewhlnttr2vqhusofoet2wzz4a
    ONTO m1u6iz2nbjxtbmydzvmwxcmaufuubyzc57sggslmvv7jdh5gzepwmq
{
  ALTER TYPE default::Post {
      CREATE PROPERTY unique: tuple<std::str, std::str, std::str, std::str, std::str> {
          CREATE REWRITE
              INSERT
              USING ((<std::str>.user.id, (.body ?? ''), (<std::str>.quote.id ?? ''), (<std::str>.replied_to.id ?? ''), (<std::str>.repost.id ?? '')));
          CREATE REWRITE
              UPDATE
              USING ((<std::str>.user.id, (.body ?? ''), (<std::str>.quote.id ?? ''), (<std::str>.replied_to.id ?? ''), (<std::str>.repost.id ?? '')));
      };
      CREATE CONSTRAINT std::exclusive ON (.unique);
  };
};
