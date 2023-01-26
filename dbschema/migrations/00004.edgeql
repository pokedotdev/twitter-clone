CREATE MIGRATION m15up42yzxfp7zjb7txaxmp44ecx3orili2vqygmmlnhst27l55lda
    ONTO m1uudrnymrfnbbeslswl2sv3vug6wwb2antnt4rxeu756ex3rptiya
{
  ALTER TYPE has::CreatedAt {
      ALTER PROPERTY created_at {
          SET REQUIRED USING (std::datetime_current());
      };
  };
};
