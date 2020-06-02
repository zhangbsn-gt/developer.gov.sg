# developer.gov.sg

[![Known Vulnerabilities](https://snyk.io//test/github/GovTechSG/developer.gov.sg/badge.svg?targetFile=package.json)](https://snyk.io//test/github/GovTechSG/developer.gov.sg?targetFile=package.json)
[![GuardRails badge](https://badges.guardrails.io/GovTechSG/developer.gov.sg.svg)](https://dashboard.guardrails.io/default/gh/GovTechSG/developer.gov.sg)

## Development

### Requirements

-   Node.js v10 / npm v6
-   rbenv\* with Ruby 2.5

\*npm commands detailed below assume the usage of [rbenv](https://github.com/rbenv/rbenv) to manage your Ruby environment. See `package.json`.

### Local development

#### Setup

```sh
# Jekyll only
gem install jekyll bundler

bundler install

bundle exec jekyll serve

# Webpack/static files
npm install
```

#### Run locally - frontend only

Recommended: run webpack and jekyll in separate terminal sessions, the access the site through localhost:4000. This is to allow for easy termination of both processes.

```sh
# Terminal 1
# jekyll dev server on localhost:4000; watches and builds site at _site/
npm run dev:jekyll
```

```sh
# Terminal 2
# webpack in watch mode; runs tasks like vue app compilation and image compression
npm run dev:static
```
