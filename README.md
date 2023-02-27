## Description

This is an API Rest develop to give services for a web store about cubes

## Installation

```bash
$ npm install
```

## Using Docker to start PostgreSQL database

```bash
# start database container
$ npm run db:up

# stop and delete database container
$ npm run db:rm

# restart database container
$ npm run db:restart
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Don't forget to run migrations with prisma

```bash
# Running migrations
$ npx prisma migrate dev
```

Nest is [MIT licensed](LICENSE).
