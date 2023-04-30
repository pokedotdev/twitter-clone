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
```

This creates an EdgeDB instance and applies all migrations from `dbschema/migrations`.

### 2. Codegen

Generate code for EdgeDB, UnoCSS and Remix.
```sh
pnpm codegen
```

### 3. Seed the database

```sh
pnpm db:seed
```

This creates a user with the username "test", in order to interact with it.

### 4. GitHub OAuth

Configure a [GitHub OAuth application](https://github.com/settings/applications/new) with "**Authorization callback URL**" as:
```txt
http://localhost:3000/auth/callback/github
```

### 5. Create `.env`

Rename the file `.env.example` to `.env` and only change the values of the variables.

### 6. Start the server

This starts your app in development mode.

```sh
pnpm dev
```

Go to [localhost:3000](http://localhost:3000), create an account with your GitHub account, and explore the application.
