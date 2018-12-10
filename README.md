## Api calls
### Implementation of Api calls are made with help of Promise api to make them more readable, modern but could be replaced with try...catch api anytime.

## Storage
### I didn't do it (storage) with help of localStorage only but with Vuex storage to make app have centralized storage with some actions, mutations, etc. to work with any kind of backend not only in browser memory. In other words app becomes a little bit expandable for example with api calls to dedicated server where localStorage is not suitable enough.

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Run your unit tests
```
yarn run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
