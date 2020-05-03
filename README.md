# svelte-firestore

This project is based on the svelte-template with firebase added

To use:

1. Add firebase configuration settings in /src/firebase/config.js

2. Modify /src/App.svelte to test access to firestore collections

N.B. Note the changes in /rollup.config.js:
commonjs({
namedExports: {
// left-hand side can be an absolute path, a path
// relative to the current directory, or the name
// of a module in node_modules
'node_modules/idb/build/idb.js': ['openDb', 'deleteDb'],
'node_modules/firebase/dist/index.cjs.js': [
'initializeApp',
'firestore',
],
'node_modules/firebase/functions/dist/index.esm.js': ['default'],
},
}),
namedExports were added due to compilation errors - don't know why, but this fixed them!!

_Looking for a shareable component template? Go here --> [sveltejs/component-template](https://github.com/sveltejs/component-template)_

---

# svelte app

This is a project template for [Svelte](https://svelte.dev) apps. It lives at https://github.com/sveltejs/template.

To create a new project based on this template using [degit](https://github.com/Rich-Harris/degit):

```bash
npx degit sveltejs/template svelte-app
cd svelte-app
```

_Note that you will need to have [Node.js](https://nodejs.org) installed._
