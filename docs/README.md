# Developer Documentation

This application is composed of sub applications, all self contained within their own folders; They all have their own independent `package.json` dependency management.

This allows for smoother deployment of the sub applications as servers/services across virtual machines and clusters without needing to copy the entire source code, especially when needing to scale an individual application (e.g. needing to scale the realtime socket server only due to increased demand in concurrent connections)

Eventually, this may be refactored such that every sub application is its own github repository with its own version and tracking.

# Getting Started

In order to get the app started for development, a few key steps are needed.

* Install [MongoDB](https://www.mongodb.com/) & make sure you have a local mongo server instance running.

* Copy the sample env config object

```bash
cp config/env.sample.js config/env.js
```

* Install Dependencies and Run Setup Scripts

```bash
yarn
yarn setup
yarn env development
```

* Start the application

```bash
yarn start:client # in one window
yarn start:server # in another window
```

* Seed/Wipe the database

```bash
yarn db seed # wipes pre-existing data and seeds data
yarn db wipe # wipes database
```

# Testing

More information on [testing](testing.md) can be found here.

# System Architecture

The system architecture of Codesling consists of these main sub applications:

![codesling architecture v1](assets/codesling-architecture-v1.png)

## [client](client.md)

The front-end codebase is written in [ReactJS](https://reactjs.org/) and bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app#getting-started)

## [rest-server](rest-server.md)

The RESTful JSON Data API is written in Javascript using NodeJS and [expressJS](https://expressjs.com/).

## [socket-server](socket-server.md)

The realtime socket server is written in Javascript using NodeJS and [socket.io](https://socket.io/).

## [coderunner-service](coderunner-service.md)

The service that runs individual code submissions is written in Javascript using NodeJS and some native NodeJS libraries.

# File Architecture

The file architecture of Codesling is broken up into sub applications. The specific architecture within the sub applications can be found in the individual `README.md` files for each sub application.

## File Naming

### Suffixes

**Directories:**

- `-server`: All client-facing back-end APIs
- `-server`: All non-client-facing back-end APIs

**Files:**

- `*.test.js`: All test files to be recognized by Jest

# Other Conventions

#### bin/entry.js

Across all of the back-end servers and services, this project utilizes an `entry.js` script responsible for starting the server.

This entry script utilizes `babel-register` and `babel-polyfill` with the [`env` preset](https://github.com/babel/babel-preset-env) for leveraging ES6+ features. This setup will transpile the back-end ES6+ source code while interpreting the code, so no further pre-transpilation is required.
