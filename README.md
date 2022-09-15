# Express API using TypeScript PostgreSQL Prisma Docker

<p>Basic TODO API using Express and TypeScript, to demonstrate the development setup with pgAdmin4 and Prisma Studio.</p>

NOTE: touch .env similar to example.env before running any of the scripts

<br>

## Scripts

### Dev Server without Docker

```
yarn run dev
```

### Prod Server without Docker

```
yarn run build; yarn run pro
```

### Dev Server with Docker

```
yarn run compose:up:dev
```

### Dev Server with Docker

```
yarn run compose:up:dev
```

### Turn off the dev server and remove images and containers

```
yarn run compose:down:dev
```

### Turn off the dev server and remove images and containers and volumes

```
yarn run compose:down:dev:full
```
