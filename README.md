# Vocabulary application

This is monorepo (Lerna based) for vocabulary application.

## Current repos:

- [`./apps/frontend`](apps/frontend/README.md) - React frontend application
- [`./apps/backend`](apps/backend/README.md) - Serverless NodeJS project serving backend

## Getting started:

- Make sure you have lerna installed globally (`npm install -g lerna`)
- Read carefully and follow instructions in README file for each package (`apps` folder)

## Available commands:

- `npm run lint` runs linting check over all available repos
- `npm run format` aligns file formatting in all available repos
- `npm run deploy` runs deployment scripts for each repo that implements such functionality

## CI
This monorepo actively uses github actions for CI/CD.

Available workflows:
- `deploy.yml` - this workflow deploys backend repo to AWS