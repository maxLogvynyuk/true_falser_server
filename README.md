# Eliftech TrueFalsr-server

## Overview

This is a boilerplate application for building REST APIs in Node.js using ES6 and Express. Intended for use with Postgres using Sequelize ORM.

## Getting Started

1. Create Google and Facebook apps and make the necessary settings

```sh
1.1. Create new project in Google Deleloper Console https://console.cloud.google.com/home/dashboard.
     Create API Credentials and choose OAuth client ID
     In the Allowed redirect URIs section add https://{your-app-url}/callback/google and save
     Example how create project and client: https://medium.com/@nickroach_50526/sending-emails-with-node-js-using-smtp-gmail-and-oauth2-316fe9c790a1

1.2 Create new Facebook project in Facebok for Developers https://developers.facebook.com/
    In app Settings chose Basic and do next settings:
    - add App Domains(your futur site);
    - choose section Website add Site URL https://{your-site-url}/callback/facebook;
    - fill in Data Protection Officer Contact Information and turn on your app.
```

Deploy app on server and install dependencies:

```sh
npm i nodemon -g
npm i
```

Set environment (vars):

```sh
cp .env.example .env
```

Start server:

```sh
# Start server
npm run start
```

Install nodemon and sequelize-cli

```sh
npm install -g nodemon
npm install -g sequelize-cli
```

Create database

```sh
sudo su postgres
psql
CREATE DATABASE db_name
```

## Sequelize

Migrate all migrations

```sh
sequelize db:migrate
```

Revert all migrations

```sh
sequelize db:migrate:undo
```
