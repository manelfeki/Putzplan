## start the server ##

-first, install mongo db community server
-then, in Putzplan/src/backend, install mongoose : npm install mongoose

to start the server , type in Putzplan/src/backend : " node ./api.js"
the server is located in http://localhost:8080/

list of residents : http://localhost:8080/api/residents
list of tasks : http://localhost:8080/api/tasks



## [Devias Kit - Admin Dashboard](https://react-material-dashboard.devias.io/dashboard)

> Free React Dashboard made with [Material UI's](https://material-ui.com/?ref=devias-io) components, [React](https://reactjs.org/?ref=devias-io) and of course [create-react-app](https://facebook.github.io/create-react-app/?ref=devias-io) to boost your app development process! We'll launch a pro version soon, so if you are interested subscribe to our personal emailing list on [https://devias.io/](https://devias.io/)

## Quick start

- Clone the repo: `https://github.com/manelfeki/Putzplan.git`

- Make sure your NodeJS and npm versions are up to date for `React 16.8.6`

- Install dependencies: `npm install` or `yarn`

- Start the server: `npm run start` or `yarn start`

- Views are on: `localhost:3000`

## File Structure

Within the download you'll find the following directories and files:

```
Putzplan

├── .eslintrc
├── .gitignore
├── .prettierrc
├── CHANGELOG.md
├── jsconfig.json
├── package.json
├── README.md
├── public
└── src
	├── assets
	├── common
	│	├── actions.js
	│	├── saga.js
	│	├── rootReducer.js
	├── components
	├── helpers
	├── layouts
	├── theme
	├── views
	│	├── Account
	│	├── Dashboard
	│	├── NotFound
	│	├── TaskList
	│	├── TaskAdd
	│	├── TaskUpdate
	│	├── SignIn
	│	├── SignUp
	│	└── UserList
	│	└── UserAdd
	├── App.jsx
	├── index.jsx
	└── Routes.jsx
```

