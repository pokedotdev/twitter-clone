import { $ } from "edgedb";
import * as _ from "../imports";
import type * as _has from "./has";
import type * as _std from "./std";
export type $BaseTweetλShape = $.typeutil.flatten<_has.$CreatedAtλShape & {
  "body": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "is_own": $.PropertyDesc<_std.$bool, $.Cardinality.One, false, true, false, false>;
  "tag": $.PropertyDesc<_std.$str, $.Cardinality.One, false, true, false, false>;
  "likes": $.LinkDesc<$User, $.Cardinality.Many, {}, false, true,  false, false>;
  "is_liked": $.PropertyDesc<_std.$bool, $.Cardinality.One, false, true, false, false>;
  "num_likes": $.PropertyDesc<_std.$int64, $.Cardinality.One, false, true, false, false>;
  "quote": $.LinkDesc<$BaseTweet, $.Cardinality.AtMostOne, {}, false, false,  false, false>;
  "replies": $.LinkDesc<$Reply, $.Cardinality.Many, {}, false, true,  false, false>;
  "retweets": $.LinkDesc<$BaseTweet, $.Cardinality.Many, {}, false, true,  false, false>;
  "user": $.LinkDesc<$User, $.Cardinality.One, {}, false, false,  false, false>;
  "is_retweeted": $.PropertyDesc<_std.$bool, $.Cardinality.One, false, true, false, false>;
  "num_replies": $.PropertyDesc<_std.$int64, $.Cardinality.One, false, true, false, false>;
  "num_retweets": $.PropertyDesc<_std.$int64, $.Cardinality.One, false, true, false, false>;
  "<tweets[is User]": $.LinkDesc<$User, $.Cardinality.Many, {}, false, false,  false, false>;
  "<likes[is User]": $.LinkDesc<$User, $.Cardinality.Many, {}, false, false,  false, false>;
  "<quote[is BaseTweet]": $.LinkDesc<$BaseTweet, $.Cardinality.Many, {}, false, false,  false, false>;
  "<quote[is Reply]": $.LinkDesc<$Reply, $.Cardinality.Many, {}, false, false,  false, false>;
  "<quote[is Tweet]": $.LinkDesc<$Tweet, $.Cardinality.Many, {}, false, false,  false, false>;
  "<replied_to[is Reply]": $.LinkDesc<$Reply, $.Cardinality.Many, {}, false, false,  false, false>;
  "<retweets[is BaseTweet]": $.LinkDesc<$BaseTweet, $.Cardinality.Many, {}, false, false,  false, false>;
  "<retweets[is Reply]": $.LinkDesc<$Reply, $.Cardinality.Many, {}, false, false,  false, false>;
  "<retweets[is Tweet]": $.LinkDesc<$Tweet, $.Cardinality.Many, {}, false, false,  false, false>;
  "<quote[is Retweet]": $.LinkDesc<$Retweet, $.Cardinality.Many, {}, false, false,  false, false>;
  "<retweets[is Retweet]": $.LinkDesc<$Retweet, $.Cardinality.Many, {}, false, false,  false, false>;
  "<likes": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<quote": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<replied_to": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<retweets": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<tweets": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $BaseTweet = $.ObjectType<"default::BaseTweet", $BaseTweetλShape, null>;
const $BaseTweet = $.makeType<$BaseTweet>(_.spec, "aa02a6a8-20fe-11ed-a21e-41d52fafa98f", _.syntax.literal);

const BaseTweet: $.$expr_PathNode<$.TypeSet<$BaseTweet, $.Cardinality.Many>, null, true> = _.syntax.$PathNode($.$toSet($BaseTweet, $.Cardinality.Many), null, true);

export type $ReplyλShape = $.typeutil.flatten<$BaseTweetλShape & {
  "replied_to": $.LinkDesc<$BaseTweet, $.Cardinality.One, {}, false, false,  false, false>;
  "<replies[is BaseTweet]": $.LinkDesc<$BaseTweet, $.Cardinality.Many, {}, false, false,  false, false>;
  "<replies[is Reply]": $.LinkDesc<$Reply, $.Cardinality.Many, {}, false, false,  false, false>;
  "<replies[is Tweet]": $.LinkDesc<$Tweet, $.Cardinality.Many, {}, false, false,  false, false>;
  "<replies[is Retweet]": $.LinkDesc<$Retweet, $.Cardinality.Many, {}, false, false,  false, false>;
  "<replies": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $Reply = $.ObjectType<"default::Reply", $ReplyλShape, null>;
const $Reply = $.makeType<$Reply>(_.spec, "aa0883b6-20fe-11ed-83fe-433c41a72a32", _.syntax.literal);

const Reply: $.$expr_PathNode<$.TypeSet<$Reply, $.Cardinality.Many>, null, true> = _.syntax.$PathNode($.$toSet($Reply, $.Cardinality.Many), null, true);

export type $RetweetλShape = $.typeutil.flatten<Omit<$BaseTweetλShape, "quote"> & {
  "quote": $.LinkDesc<$BaseTweet, $.Cardinality.One, {}, false, false,  false, false>;
}>;
type $Retweet = $.ObjectType<"default::Retweet", $RetweetλShape, null>;
const $Retweet = $.makeType<$Retweet>(_.spec, "c4a47874-20fe-11ed-acea-511f319f7582", _.syntax.literal);

const Retweet: $.$expr_PathNode<$.TypeSet<$Retweet, $.Cardinality.Many>, null, true> = _.syntax.$PathNode($.$toSet($Retweet, $.Cardinality.Many), null, true);

export type $TweetλShape = $.typeutil.flatten<$BaseTweetλShape & {
}>;
type $Tweet = $.ObjectType<"default::Tweet", $TweetλShape, null>;
const $Tweet = $.makeType<$Tweet>(_.spec, "a7eed508-20fe-11ed-9455-2d7a6a8f8607", _.syntax.literal);

const Tweet: $.$expr_PathNode<$.TypeSet<$Tweet, $.Cardinality.Many>, null, true> = _.syntax.$PathNode($.$toSet($Tweet, $.Cardinality.Many), null, true);

export type $UserλShape = $.typeutil.flatten<_has.$CreatedAtλShape & {
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
  "tweets": $.LinkDesc<$BaseTweet, $.Cardinality.Many, {}, false, true,  false, false>;
  "num_tweets": $.PropertyDesc<_std.$int64, $.Cardinality.One, false, true, false, false>;
  "following": $.LinkDesc<$User, $.Cardinality.Many, {
    "@created_at": $.PropertyDesc<_std.$datetime, $.Cardinality.AtMostOne>;
  }, false, false, false, false>;
  "likes": $.LinkDesc<$BaseTweet, $.Cardinality.Many, {
    "@created_at": $.PropertyDesc<_std.$datetime, $.Cardinality.AtMostOne>;
  }, false, false, false, false>;
  "is_followed": $.PropertyDesc<_std.$bool, $.Cardinality.One, false, true, false, false>;
  "num_followers": $.PropertyDesc<_std.$int64, $.Cardinality.One, false, true, false, false>;
  "num_following": $.PropertyDesc<_std.$int64, $.Cardinality.One, false, true, false, false>;
  "<following[is User]": $.LinkDesc<$User, $.Cardinality.Many, {}, false, false,  false, false>;
  "<followers[is User]": $.LinkDesc<$User, $.Cardinality.Many, {}, false, false,  false, false>;
  "<user[is BaseTweet]": $.LinkDesc<$BaseTweet, $.Cardinality.Many, {}, false, false,  false, false>;
  "<user[is Reply]": $.LinkDesc<$Reply, $.Cardinality.Many, {}, false, false,  false, false>;
  "<user[is Tweet]": $.LinkDesc<$Tweet, $.Cardinality.Many, {}, false, false,  false, false>;
  "<user[is Retweet]": $.LinkDesc<$Retweet, $.Cardinality.Many, {}, false, false,  false, false>;
  "<likes[is BaseTweet]": $.LinkDesc<$BaseTweet, $.Cardinality.Many, {}, false, false,  false, false>;
  "<likes[is Reply]": $.LinkDesc<$Reply, $.Cardinality.Many, {}, false, false,  false, false>;
  "<likes[is Tweet]": $.LinkDesc<$Tweet, $.Cardinality.Many, {}, false, false,  false, false>;
  "<likes[is Retweet]": $.LinkDesc<$Retweet, $.Cardinality.Many, {}, false, false,  false, false>;
  "<followers": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<following": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<likes": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<user": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $User = $.ObjectType<"default::User", $UserλShape, null>;
const $User = $.makeType<$User>(_.spec, "a7dcb828-20fe-11ed-93ae-db89e4f7e3be", _.syntax.literal);

const User: $.$expr_PathNode<$.TypeSet<$User, $.Cardinality.Many>, null, true> = _.syntax.$PathNode($.$toSet($User, $.Cardinality.Many), null, true);

const $default__globals: {  current_user_id: _.syntax.$expr_Global<
              "default::current_user_id",
              _std.$uuid,
              $.Cardinality.AtMostOne
              >} = {  current_user_id: _.syntax.makeGlobal(
              "default::current_user_id",
              $.makeType(_.spec, "00000000-0000-0000-0000-000000000100", _.syntax.literal),
              $.Cardinality.AtMostOne) as any};



export { $BaseTweet, BaseTweet, $Reply, Reply, $Retweet, Retweet, $Tweet, Tweet, $User, User };

type __defaultExports = {
  "BaseTweet": typeof BaseTweet;
  "Reply": typeof Reply;
  "Retweet": typeof Retweet;
  "Tweet": typeof Tweet;
  "User": typeof User;
  "global": typeof $default__globals
};
const __defaultExports: __defaultExports = {
  "BaseTweet": BaseTweet,
  "Reply": Reply,
  "Retweet": Retweet,
  "Tweet": Tweet,
  "User": User,
  "global": $default__globals
};
export default __defaultExports;
