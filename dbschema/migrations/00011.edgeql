CREATE MIGRATION m1xlo2mc7thynqle47dhozoryrnvtwu645j7xow4fg3kg5abumdmba
    ONTO m127br77vqy5qygjrj2vhnx4anykhzlnet2if2kd63ac2nr7nkfska
{
  ALTER TYPE default::BaseTweet RENAME TO default::Post;
};
