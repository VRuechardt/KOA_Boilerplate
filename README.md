# Setup

## Database
Requires a database named `devel` using utf-8 encoding.

For testing, a database named `test` with collation utf-8 is required.

## Dependencies
To install node modules, run the following from project root:

`cd backend`

`npm install`

To run tests, the global dependency mocha is required:

`npm install -g mocha`

## Run server
Navigate to `/backend/server`.

Start application:

`node app.js`

## Run test
Navigate to `/backend`-

Run tests:

`npm test`
