# To Do Application

This application is a TO DO task manager that allows the user to create and complete tasks in a list.

To run the APP locally, first you'll need a version of Node and NPM (Node v18.13.0 + NPM v8.19.3) or YARN (v1.22.19). Then run `npm install` or `yarn install` on the root of the project in order to install all the dependencies.

After the installation of the dependencies, you can use the command `npm run dev` or `yarn dev` to run the application, once the server starts, it will be listening at http://localhost:5173/

> **Note:** This **To Do** has an open source cloud storage (https://supabase.io/) created only for this application with no user authentication for the tasks.

## Getting Started step by step

1. install every package in the root:

```bash
npm run install
# or
yarn install
```

1. Run the server in another terminal:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the application.

## Useful commands

- `npm run dev` - Run the application locally
- `npm run test` - Run the tests
- `npm run build` - Build a new version to deploy

## Used libraries and technologies

- [React](https://react.dev/) - Library for web and native user interfaces
- [Jest](https://jestjs.io/) - Testing library
- [Vite](https://vitejs.dev/guide/) - Development environment tool
- [Material UI](https://mui.com/core/) - Design system components
- [Supabase](https://supabase.com/) - Open source cloud storage

## Public URL Application

The page is hosted on Vercel -> https://to-do-app-three-phi.vercel.app/

> Note: By default, every commit pushed to the main branch will trigger a Production Deployment instead of the usual Preview Deployment. You can switch to a different branch here.