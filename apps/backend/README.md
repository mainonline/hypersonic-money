## 🍔 Stack Specs

- Node.js
- Express
- TypeScript
- Prisma
- Postgres


- Install dependencies

```
pnpm install
```

- Create a Database in Postgres (or) You can use GUI to create a database

```
postgres=# CREATE DATABASE express;
```

- Copy the `.env.sample` file as `.env`

```
cp .env.sample .env
```

- Edit the Postgres Details in the `.env` file

```
DATABASE_URL="postgresql://postgres:password@dev@localhost:5432/express"
```

- Push the Prisma Schema into Database

```
npx prisma migrate dev
```

- Run the development server

```
pnpm dev
```

## 🚀 Production Build

- Run the production build

```
pnpm build
```

- Start the production server

```
pnpm start
```