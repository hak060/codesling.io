# Codesling Client Developer Documentation

**Note:** If you want to run all backend services along with the clientside development server, check out the main `README.md` [instructions](README.md#getting-started)

To get started on client-side development, run the following from within the `client` folder:

```bash
yarn
yarn start
```

This will start the create-react-app script responsible for the weback-dev-server for rendering changes in the browser when making changes to the client side codebase.

## Components

Individual components are located inside of `./src/components`. Any reusable shared component that is used more than once belongs in the `./src/components/globals` sub folder.

## Styles

Every component is accompanied by a `.scss` file which **is** committed into version control. The accompanying `.css` file that is compiled from the `.scss` source file **is not** committed into version control. In a component, be sure to import the `.css` compiled file like so:

```diff
// App.js
import React from 'react';

+ import './App.css';

const App = () => {/*...*/};

export default App;
```

The SCSS to CSS compilation can be manually run with `yarn build-css`, though it's likely unneeded as `yarn start` will start up the css compilation watcher in the background.
