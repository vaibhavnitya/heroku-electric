# node-js-getting-started

A barebones Node.js app using [Express 4](http://expressjs.com/).

This application supports the [Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs) article - check it out.

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku CLI](https://cli.heroku.com/) installed.

```sh
$ git clone https://github.com/heroku/node-js-getting-started.git # or clone your own fork
$ cd node-js-getting-started
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

```
$ heroku create
$ git push heroku master
$ heroku open
```
or

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Documentation

For more information about using Node.js on Heroku, see these Dev Center articles:

- [Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)

## How to start

- Install heroku CLI
- heroku login
- Git repo: https://github.com/vaibhavnitya/heroku-electric.git
- To push to server: git push heroku master
- Run locally: heroku local web
- Remote server git : https://git.heroku.com/heroku-electric.git

## How to run heroku electric app
Pre-requisites:
1. NodeJS installed: >10.x
2. npm installed
3. git installed
4. heroku CLI installed
```
$ git clone https://github.com/vaibhavnitya/heroku-electric.git
$ cd heroku-electric
$ npm install
```
#### To run locally
```
$ heroku local web
```
#### To run on heroku server
- set the remote heroku master:
```
$ git remote add heroku [your heroku app git URL]
$ git push heroku master
```
