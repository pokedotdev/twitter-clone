import { $ } from "edgedb";
import * as _ from "../imports";
import type * as _std from "./std";
enum $TweetTypeλEnum {
  TWEET = "TWEET",
  RETWEET = "RETWEET",
  REPLY = "REPLY",
}
export type $TweetType = {
  TWEET: $.$expr_Literal<$TweetType>;
  RETWEET: $.$expr_Literal<$TweetType>;
  REPLY: $.$expr_Literal<$TweetType>;
} & $.EnumType<"default::TweetType", `${$TweetTypeλEnum}`>;
const TweetType: $TweetType = $.makeType<$TweetType>(_.spec, "e2f883ac-1199-11ed-b027-d1d87ed12cae", _.syntax.literal);

export type $HasCreatedAtλShape = $.typeutil.flatten<_std.$Object_1314de600e2e11ed9ceb0977e08fb96bλShape & {
  "created_at": $.PropertyDesc<_std.$datetime, $.Cardinality.AtMostOne, false, false, true, true>;
}>;
type $HasCreatedAt = $.ObjectType<"default::HasCreatedAt", $HasCreatedAtλShape, null>;
const $HasCreatedAt = $.makeType<$HasCreatedAt>(_.spec, "e2e0a17e-1199-11ed-bae8-df7f7ae314d9", _.syntax.literal);

const HasCreatedAt: $.$expr_PathNode<$.TypeSet<$HasCreatedAt, $.Cardinality.Many>, null, true> = _.syntax.$PathNode($.$toSet($HasCreatedAt, $.Cardinality.Many), null, true);

export type $TweetλShape = $.typeutil.flatten<$HasCreatedAtλShape & {
  "user": $.LinkDesc<$User, $.Cardinality.One, {}, false, false,  false, false>;
  "is_own": $.PropertyDesc<_std.$bool, $.Cardinality.One, false, true, false, false>;
  "body": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "tweet_type": $.PropertyDesc<$TweetType, $.Cardinality.One, false, false, false, false>;
  "likes": $.LinkDesc<$User, $.Cardinality.Many, {}, false, true,  false, false>;
  "num_likes": $.PropertyDesc<_std.$int64, $.Cardinality.One, false, true, false, false>;
  "<likes[is User]": $.LinkDesc<$User, $.Cardinality.Many, {}, false, false,  false, false>;
  "<likes[is current_user]": $.LinkDesc<$current_user, $.Cardinality.Many, {}, false, false,  false, false>;
  "<tweets[is User]": $.LinkDesc<$User, $.Cardinality.Many, {}, false, false,  false, false>;
  "<tweets[is current_user]": $.LinkDesc<$current_user, $.Cardinality.Many, {}, false, false,  false, false>;
  "<likes": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<tweets": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $Tweet = $.ObjectType<"default::Tweet", $TweetλShape, null>;
const $Tweet = $.makeType<$Tweet>(_.spec, "e2f89432-1199-11ed-b21a-3739ece368b7", _.syntax.literal);

const Tweet: $.$expr_PathNode<$.TypeSet<$Tweet, $.Cardinality.Many>, null, true> = _.syntax.$PathNode($.$toSet($Tweet, $.Cardinality.Many), null, true);

export type $UserλShape = $.typeutil.flatten<$HasCreatedAtλShape & {
  "following": $.LinkDesc<$User, $.Cardinality.Many, {
    "@created_at": $.PropertyDesc<_std.$datetime, $.Cardinality.AtMostOne>;
  }, false, false, false, false>;
  "followers": $.LinkDesc<$User, $.Cardinality.Many, {}, false, true,  false, false>;
  "avatarUrl": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "bio": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "coverUrl": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "is_own": $.PropertyDesc<_std.$bool, $.Cardinality.One, false, true, false, false>;
  "location": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "name": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "provider": $.PropertyDesc<$.NamedTupleType<{name: _std.$str, id: _std.$str}>, $.Cardinality.One, true, false, false, false>;
  "username": $.PropertyDesc<_std.$str, $.Cardinality.One, true, false, false, false>;
  "website": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "likes": $.LinkDesc<$Tweet, $.Cardinality.Many, {
    "@created_at": $.PropertyDesc<_std.$datetime, $.Cardinality.AtMostOne>;
  }, false, false, false, false>;
  "tweets": $.LinkDesc<$Tweet, $.Cardinality.Many, {}, false, true,  false, false>;
  "<following[is User]": $.LinkDesc<$User, $.Cardinality.Many, {}, false, false,  false, false>;
  "<followers[is User]": $.LinkDesc<$User, $.Cardinality.Many, {}, false, false,  false, false>;
  "<followers[is current_user]": $.LinkDesc<$current_user, $.Cardinality.Many, {}, false, false,  false, false>;
  "<following[is current_user]": $.LinkDesc<$current_user, $.Cardinality.Many, {}, false, false,  false, false>;
  "<user[is Tweet]": $.LinkDesc<$Tweet, $.Cardinality.Many, {}, false, false,  false, false>;
  "<likes[is Tweet]": $.LinkDesc<$Tweet, $.Cardinality.Many, {}, false, false,  false, false>;
  "<followers": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<following": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<likes": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<user": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $User = $.ObjectType<"default::User", $UserλShape, null>;
const $User = $.makeType<$User>(_.spec, "e2e2dec6-1199-11ed-91c5-4fcdf8166b05", _.syntax.literal);

const User: $.$expr_PathNode<$.TypeSet<$User, $.Cardinality.Many>, null, true> = _.syntax.$PathNode($.$toSet($User, $.Cardinality.Many), null, true);

export type $current_userλShape = $.typeutil.flatten<$UserλShape & {
}>;
type $current_user = $.ObjectType<"default::current_user", $current_userλShape, null>;
const $current_user = $.makeType<$current_user>(_.spec, "e2f7b800-1199-11ed-8a79-1d744609a465", _.syntax.literal);

const current_user: $.$expr_PathNode<$.TypeSet<$current_user, $.Cardinality.Many>, null, true> = _.syntax.$PathNode($.$toSet($current_user, $.Cardinality.Many), null, true);

const $default__globals: {  current_user: _.syntax.$expr_Global<
              "default::current_user",
              $current_user,
              $.Cardinality.Many
              >,  current_user_id: _.syntax.$expr_Global<
              "default::current_user_id",
              _std.$uuid,
              $.Cardinality.AtMostOne
              >} = {  current_user: _.syntax.makeGlobal(
              "default::current_user",
              $.makeType(_.spec, "e2f7b800-1199-11ed-8a79-1d744609a465", _.syntax.literal),
              $.Cardinality.Many) as any,  current_user_id: _.syntax.makeGlobal(
              "default::current_user_id",
              $.makeType(_.spec, "00000000-0000-0000-0000-000000000100", _.syntax.literal),
              $.Cardinality.AtMostOne) as any};



export { $TweetTypeλEnum, TweetType, $HasCreatedAt, HasCreatedAt, $Tweet, Tweet, $User, User, $current_user, current_user };

type __defaultExports = {
  "TweetType": typeof TweetType;
  "HasCreatedAt": typeof HasCreatedAt;
  "Tweet": typeof Tweet;
  "User": typeof User;
  "current_user": typeof current_user;
  "global": typeof $default__globals
};
const __defaultExports: __defaultExports = {
  "TweetType": TweetType,
  "HasCreatedAt": HasCreatedAt,
  "Tweet": Tweet,
  "User": User,
  "current_user": current_user,
  "global": $default__globals
};
export default __defaultExports;
