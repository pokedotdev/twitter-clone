import { createClient } from "edgedb";

import e from "./edgeql-js";

const client = createClient();

async function seed() {
  const provider = "github";
  const provider_id = "123";
  const user = e.select(e.User, (u) => ({
    filter: e.op(
      e.op(u.account.provider, "=", provider),
      'and',
      e.op(u.account.provider_id, "=", provider_id)
    ),
  })).assert_single();

  // cleanup the existing database
  await e.delete(user).run(client);

  // create user and account nestedly
  await e
    .insert(e.auth.Account, {
			 provider,
			 provider_id,
			 user: e.insert(e.User, {
				 username: "test",
				 name: "Test User",
			 })
   	})
    .run(client);

  // create tweets
  await e
    .set(
      e.insert(e.Tweet, {
				body: "Hello, world!",
				tweet_type: "TWEET",
				user,
      }),
      e.insert(e.Tweet, {
        body: "Second tweet",
				tweet_type: "TWEET",
				user 
      })
    )
    .run(client);

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    client.close();
  });
