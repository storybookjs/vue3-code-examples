# Storybook Examples with Vuetify Integration

This repository contains a collection of story examples which can be used as a reference while developing Vue.js applications with Vuetify library.

## Getting Started

To get started with the project, simply clone the repository and install the dependencies using the following command:


`pnpm install`


### Adding Vuetify

This project is already set up to work with Vuetify. To add Vuetify in your own project, you can follow these steps:

1. Install Vuetify and its dependencies using `pnpm`:


pnpm install vuetify sass sass-loader deepmerge -D


2. Create Vuetify plugin by creating a `vuetify.js` file and adding the following content:

```javascript
// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
        },
      },
    },
  },
  components,
  directives,
})

```

3. Import the Vuetify file in your preview.js::

```javascript
import  { setup }  from '@storybook/vue3';
import type { App } from 'vue'

import vuetify from '../src/plugins/vuetify'
import { loadFonts } from '../src/plugins/webfontloader'

loadFonts()

setup((app:App) => {
  app.use(vuetify);
})

// you can define global your Vuetify decorators
export const decorators = [withVuetifyTheme]

```
### Running Storybook

To run the project, use the following command:

```
pnpm storybook
```

### Maintainer

For any queries or suggestions related to this project, please feel free to reach out to the maintainer at javachakir@gmail.com or on Discord at Chak-As3#7479
