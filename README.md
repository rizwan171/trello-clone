# Running the application

## Prerequisites
- Docker
- Node

## Running the whole app (backend + frontend)
- Run `docker compose up --detach` in terminal from the root of this project
- Go to `localhost:8080`
- When done

## Running just the frontend
- Naviage to `src/main/frontend/` in the termninal
- Run `yarn start`
- Go to `localhost:8080`

## Accessing the database via pgAdmin
- The docker compose file starts up a pgAdmin container alongside the postgres database.
- This can be accessed on `localhost:5050`, with email `dev@dev.co.uk` and password `dev`
- To setup the database within pgAdmin:
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
- To reset the database, run `docker compose down` in terminal from the root of this project, and re-run `docker compose up --detach`
- NOTE: this also resets pgAdmin, and requires you to setup the connection to the database again

# Running tests locally

## Jest Tests
- Navigate to `src/main/frontend/`
- Run `yarn test` to run all tests
- Run `yarn test --watch` to run the tests in watch mode