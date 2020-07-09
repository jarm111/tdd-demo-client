# TDD Demo Client

A demo project for my thesis about developing a web application in test-driven style. The app is an events board where user can browse and post happenings.

Features:

- Events can be browsed, filtered and opened for more details
- User can sign up and log in
- Logged in user can create, modify and delete own events

UI components and Redux reducers are unit tested with Jest. App and stuff under /pages are integration tested with Cypress.

## Powered by

- [TypeScript](https://www.typescriptlang.org/)
- [Create React App](https://github.com/facebook/create-react-app)
- [React Router](https://reactrouter.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [PaperCSS](https://www.getpapercss.com/)
- [Storybook](https://storybook.js.org/)
- [Jest](https://jestjs.io/)
- [Testing Library](https://testing-library.com/)
- [Cypress](https://www.cypress.io/)

## Getting started

- clone the repo with `git clone`
- `npm install` to install dependencies
- `npm start` to start a local development server
- `npm run build` builds the app for production
- `npm test` to launch test runner
- `npm run cypress:open` to open integration test tool
- `npm run storybook` to open UI components sandbox

## API

The RESTful API that this app uses can be found [here](https://github.com/jarm111/tdd-demo-api).
