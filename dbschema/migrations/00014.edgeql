CREATE MIGRATION m1ttugkdejsrjd67rbw3jxcj5q7oa4ectuxbwlwmphkqeau3uleikq
    ONTO m1r6go5e7ev5gqsxkx5bxzzfsgsknltoh646y45wewbobk2bcsyvhq
{
  CREATE TYPE default::PostLike EXTENDING has::CreatedAt {
      CREATE REQUIRED LINK post -> default::Post {
          ON TARGET DELETE DELETE SOURCE;
      };
      CREATE REQUIRED LINK user -> default::User {
          ON TARGET DELETE DELETE SOURCE;
      };
      CREATE CONSTRAINT std::exclusive ON ((.user, .post));
  };
};
