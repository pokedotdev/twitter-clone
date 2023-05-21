CREATE MIGRATION m1gndr7iy3kqmqecduqdkkdkxuwym3d2m7fnslxibwb6pcjapozf7q
    ONTO m17lnm2ufzxovdpo7deysmc75apr5ewhlnttr2vqhusofoet2wzz4a
{
  ALTER TYPE default::Post {
      CREATE LINK parent := (SELECT
          .replied_to
      );
  };
  ALTER TYPE default::Post {
      CREATE MULTI LINK ancestors := (SELECT
          (((((((((.parent UNION .parent.parent) UNION .parent.parent.parent) UNION .parent.parent.parent.parent) UNION .parent.parent.parent.parent.parent) UNION .parent.parent.parent.parent.parent.parent) UNION .parent.parent.parent.parent.parent.parent.parent) UNION .parent.parent.parent.parent.parent.parent.parent.parent) UNION .parent.parent.parent.parent.parent.parent.parent.parent.parent) UNION .parent.parent.parent.parent.parent.parent.parent.parent.parent.parent)
      );
  };
  ALTER TYPE default::Post {
      DROP PROPERTY tag;
  };
};
