# Vue.js + Vuex + Bulma + Buefy Generator


#### A simple Vue.js CRUD frontend backed by localstorage. Great for learning and prototyping - hack it!

Built with [Vue.js](https://vuejs.org/), [Vue Router](https://router.vuejs.org/), [Vuex](https://vuex.vuejs.org/), [Bulma](https://buefy.org/), & [Buefy](https://buefy.org/). Powered by [Codotype](https://codotype.io).


#### Vuex + Persisted State

All local data is managed in [Vuex](https://vuex.vuejs.org) and persisted in `localstorage` using the [vuex-persistedstate](https://github.com/robinvdvleuten/vuex-persistedstate) package. Please note that clearning your browser cache will erase any data you enter in the tool. See the `Import / Export Data` section for more details. The `vuex-persistedstate` library stores all the local data as a string in `window.localstorage.vuex`.

All the CRUD operations in the app are encapsulated in a single function that returns a [Vuex module](https://vuex.vuejs.org/guide/modules.html). We invoke this function once for each collection we want to manage - you can view that code in `store/lib/collectionModule.js`.


#### Import / Export Data
You can import and export `.json` files containing data created in the app. You can also flush all the data as well. These features are available on the `/settings` page.

The app expects the data for be formatted like so:

```javascript
{
  movies: [
    { id: '1', title: 'The Godfather', director_id: '10' }
    { id: '2', title: 'Back to the Future', director_id: '11' }
  ],
  directors: [
    { id: '10', name: 'Francis Ford Coppla' }
    { id: '11', name: 'Robert Zemeckis' }
  ],

}
```


#### Directory Structure
The following is a good indication of how the code is organized in the `/src` directory:

```
├── App.vue                         // Top-level Vue component
├── components                      // Top-level page components
│   └── Navbar.vue
├── main.js                         // JavaScript entry-point for the app
├── modules                         // Modules encapsulates many sub-apps, one for each schema
│   └── schema
│       ├── components              // The schema-module's components used on the CRUD pages
│       │   ├── Detail.vue
│       │   ├── Form.vue
│       │   ├── ListItem.vue
│       │   └── List.vue
│       ├── pages                   // The schema-module's CRUD pages
│       │   ├── edit.vue
│       │   ├── list.vue
│       │   ├── new.vue
│       │   └── show.vue
│       ├── router.js               // The schema-module's routes
│       └── store
│           └── index.js            // The schema-module's Vuex module
│
├── router.js                       // Initializes Vue Router and imports all module routes
└── store
    ├── index.js                    // Initializes the Vuex store and imports all module stores
    └── lib
        └── collectionModule.js     // Vuex CRUD module
```

Note that your generated code may contain more or fewer files


#### Build Setup

**Install dependencies**
```
npm install
```

**Serve with hot reload at localhost:8080**
```
npm run dev
```

**Build for production with minification**
```
npm run build
```

**Build for production and view the bundle analyzer report**
```
npm run build --report
```

**Run unit tests**
```
npm run unit
```

**Run e2e tests**
```
npm run e2e
```

**Run all tests**
```
npm test
```

For a detailed explanation on how things work, check out the guide and docs for vue-loader.

#### Contributing
- Include kitchen sink / example pages?
- Configure icon for each schemas
- Add more datatypes? (Some array options could be nice)