# Storybook Examples with Vuetify Integration

This repository contains a collection of story examples which can be used as a reference while developing Vue.js applications with Vuetify library.

## Getting Started

To get started with the project, simply clone the repository and install the dependencies using the following command:


pnpm install


### Adding Vuetify

This project is already set up to work with Vuetify. To add Vuetify in your own project, you can follow these steps:

1. Install Vuetify and its dependencies using `pnpm`:


pnpm install vuetify sass sass-loader deepmerge -D


2. Include Vuetify in your Vue app by creating a `vuetify.js` file and adding the following content:

```javascript
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

export default new Vuetify({
  theme: { }
})
```

3. Import the Vuetify file in your main.js::

```javascript
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'

new Vue({
  render: h => h(App),
  vuetify
}).$mount('#app')
```
#Running Storybook

To run the project, use the following command:
Import the Vuetify file in your main.js:

```
pnpm storybook
```

#Maintainer

For any queries or suggestions related to this project, please feel free to reach out to the maintainer at javachakir@gmail.com. 