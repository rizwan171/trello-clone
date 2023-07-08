<h3 align="center">Trello Clone</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-badge)]()
[![Issues](https://img.shields.io/github/issues/rizwan171/trello-clone?color=blue)](https://github.com/rizwan171/trello-clone/issues)
[![Pull Requests](https://img.shields.io/github/issues-pr/rizwan171/trello-clone?color=blue)](https://github.com/rizwan171/trello-clone/pulls)
[![Repository Size](https://img.shields.io/github/repo-size/rizwan171/trello-clone)]()

</div>

---

## 📝 Table of Contents
- [About](#about)
- [Prerequisites](#prerequisites)
- [Running the app](#running-the-app)
- [Running the tests](#running-the-tests)
- [Built Using](#built-using)

## About
A React-based clone of Trello. Initially started life as a frontend only project, but a Spring Boot Kotlin backend is currently being added.

## Prerequisites
- Docker
- Node

## Running the app
Currently, the app will save data to LocalStorage and does not interact with the Kotlin backend. This is actively being worked on.<br>
It is recommended to run only the frontend if you just want to use the app as this is lighter on resources and does not require Docker.

## To start just the frontend (recommended)
NOTE: the following steps require `yarn` to be installed. Run `npm i -g yarn` to install yarn globally.
- Navigate to `src/main/frontend/` in the terminal.
- Run `yarn` to install the required dependencies.
- Run `yarn start` to start the app.
  - The app should start on `localhost:3000`.

## To start both the backend and frontend
- Run `docker compose up --detach` in terminal from the root of this project.
  - This will create the postgres database container needed for the app, as well as a pgAdmin container to query the database.
- Run the gradle build task i.e. `./gradlew build`
  - This will build the frontend assets and copy it over to the build folder
- Run the main method of `TrelloCloneApplication.kt`
  - The app will be available at `http://localhost:8080`.

## Accessing the database via pgAdmin
- The docker compose file starts up a pgAdmin container alongside the postgres database.
- This can be accessed on `localhost:5050`, with email `dev@dev.co.uk` and password `dev`
- To set up the database within pgAdmin:
  - Run `docker compose up --detach` in terminal from the root of this project
  - Login and choose `Object -> Register -> Server...`
  - In the General tab:
    - Name: set to anything you wish i.e. Trello Clone DB
  - In the Connection tab:
    - Host: trello-clone-db
    - Port: 5432
    - Username: dev
    - Password: dev
    - Toggle Save Password
    - Press Save
- The database should be viewable in the left-hand side browser under Servers

## Tearing down the database
NOTE: currently, this only applies if you are running both the backend and frontend.
- To reset the database, there are 2 options:
  - Run `docker compose down` in terminal from the root of this project, and re-run `docker compose up --detach`
    - NOTE: this also resets pgAdmin, and requires you to set up the connection to the database again.
  - Drop the `tc` schema from the `tcdb` database through pgAdmin and rerun the app.

## Running the tests
This project features 3 types of tests: unit, integration, and Jest tests.<br>

### Running Kotlin Unit Tests
The Kotlin unit tests are located under `src/test/kotlin`. To run, either:
- Run via the line gutter in your IDE.
- Run `./gradlew test` in your terminal to run all the unit tests.

### Running Kotlin Integration Tests
The Kotlin integration tests are located under `src/integrationTest/kotlin`. To run, either:
- Run via the line gutter in your IDE.
- Run `./gradlew integrationTest` in your terminal to run all the integration tests.

## Jest Tests
The frontend Jest tests are located under `src/main/frontend/src/tests`. To run, either:
- Run via the line gutter in your IDE.
- Navigate to `src/main/frontend/` and run `yarn test` to run all tests.
  - You can run `yarn test --watch` to run the tests in watch mode if you are making changes.

## Contributing
If you would like to contribute, please read the documentation under `docs/`. This will help you get setup with the required VSCode extensions and settings,
and also explains the guidelines to follow and practices used in this project. 

## Built Using
- [Spring Boot](https://spring.io/projects/spring-boot) - Backend
- [React](https://react.dev/) - Frontend Framework
- [Typescript](https://www.typescriptlang.org/) - syntactic superset of JavaScript for typing
- [PostgreSQL](https://www.postgresql.org/) - Database
- [Docker](https://www.docker.com/) - Containerisation
