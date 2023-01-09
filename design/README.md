# Devloper Environment

1. Clone the repository: `git clone`.
2. Install the recommended VSCode Extensions.
3. Disable the @builtin Typescript Language server.
4. `npm i`.
5. Prisma
   1. To setup prisma you need to create an `.env` file in the root directory of the project.
   2. Inset a new line in the file `DATABASE_URL=file:../dev/database.db`.
   3. `npx prisma generate` Generates the typescript from the schema.
   4. `npx prisma db push` Creates the tables in the database.
6. CDN
   1. Create a new folder called `cdn` in the root folder.
   2. Add `CDN_PATH=./cdn` to your `.env` file.
7. `npm run dev`.
8. Open the browser `localhost:3000/dev`.
9. Click `Refresh Database` to create some data in the database.
10. Creating the database only needs to be done once.

# Documentation

- [Vue 3](https://vuejs.org/guide/introduction.html)
  - The frontend TS/JS framework which makes the webpage reactive.
  - We are using the composition API, ensure the docs reflect this.
- [Nuxt 3](https://nuxt.com/docs/getting-started/introduction)

  - A meta-framework which creates universal applications, producing both the client-side and server-side code.

- [Prisma](https://www.prisma.io/)

  - The databse ORM.

- [TypeScript](https://www.typescriptlang.org/)
  - A superset of JS which adds static type checking.
- [Sass / Scss](https://sass-lang.com/)

  - A superset of CSS which allows for compile time extensions and features to CSS.

- [Node](https://nodejs.org/)
  - The Javascript runtime environment that the server will be running on.
- [npm](https://www.npmjs.com/)
  - A package manager for Javascript.
- [NVM](https://github.com/coreybutler/nvm-windows)
  - A manager / installer for Node & npm and managing the installed versions.
