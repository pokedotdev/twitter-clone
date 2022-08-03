# Twitter Clone

Twitter clone made with Remix, EdgeDB & UnoCSS.

**Demo**: [twitter-clone.poke.dev](https://twitter-clone.poke.dev)

### Features

- Signup/Login (With GitHub OAuth)
- Create tweets
- Follow people
- Like tweets
- View tweets from people you follow 
- View profile

### Upcoming features

- Edit profile
- Retweet & Reply to tweets
- Hashtags & Mentions
- Search tweets & people
- Dark Mode
- Optimistic UI
- Cache (for faster loading)


## Development

### 1. Initialize an EdgeDB project

First install the cli via the [EdgeDB installation guide](https://www.edgedb.com/docs/guides/quickstart), then in this project directory run (the initializer prompts to do this for you):

```sh
edgedb project init # Initialize a local db instance
npm run generate:edgeql # Generate the query builder
```

This will install the latest version of EdgeDB, spin up an instance, and apply all migrations from `dbschema/migrations`.

### 2. Seed the database

```sh
npm run db:seed
```

This creates a user with the username "test", in order to interact with it. 

### 3. Create `.env`

Rename the file `.env.example` to `.env` and only change the values of the variables.

### 4. Start the server

This starts your app in development mode, rebuilding assets on file changes.

```sh
npm run dev
```

Go to [localhost:3000](http://localhost:3000), create an account with your GitHub account, and explore the application.
