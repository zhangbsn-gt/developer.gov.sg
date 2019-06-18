# developer.gov.sg
[![Netlify Status](https://api.Netlify.com/api/v1/badges/58da9e57-3aea-469b-ad2a-1fab2f168ac5/deploy-status)](https://app.Netlify.com/sites/developer-gov-sg/deploys)

[![Known Vulnerabilities](https://snyk.io//test/github/GovTechSG/developer.gov.sg/badge.svg?targetFile=package.json)](https://snyk.io//test/github/GovTechSG/developer.gov.sg?targetFile=package.json)

[![GuardRails badge](https://badges.guardrails.io/GovTechSG/developer.gov.sg.svg)](https://dashboard.guardrails.io/default/gh/GovTechSG/developer.gov.sg)


## Development
### Requirements
- Node.js v10 / npm v6
- Ruby 2.5

### Local development
```sh
# Jekyll only
gem install jekyll bundler

bundler install

bundle exec jekyll serve

# Webpack/static files
npm install

npm run devserver # Runs webpack in watch mode and jekyll dev server as above
```

### Local Netlify functions
Set up local development environment above first.
You will need to have access to a Netlify project of this repo.

```sh
npm install netlify-cli -g # Install Netlify cli globally

netlify link # Follow instructions to link to Netlify project

netlify dev # See netlify.toml's [dev] section
```
The frontend will be available at localhost:8888. Netlify CLI will sync build settings such as environment variables for functions from the linked Netlify project, so they will be fully functional.
