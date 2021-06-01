# {{ name }}

> {{ description }}

## Build Setup

``` bash
{{#if_eq autoInstall "yarn"}}
# install dependencies
yarn install

# serve with hot reload at localhost:8080
yarn dev

# start project
yarn start
{{#unit}}

# run unit tests
yarn unit
{{/unit}}
{{#e2e}}

# run e2e tests
yarn e2e
{{/e2e}}
{{#if_or unit e2e}}

# run all tests
yarn test
{{/if_or}}
{{/if_eq}}
{{#if_ne autoInstall "yarn"}}
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# start project
npm run start
{{#unit}}

# run unit tests
npm run unit
{{/unit}}
{{#e2e}}

# run e2e tests
npm run e2e
{{/e2e}}
{{#if_or unit e2e}}

# run all tests
npm test
{{/if_or}}
{{/if_ne}}
```
