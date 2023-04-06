import type { StoryContext } from '@storybook/csf';
import { global as globalThis } from '@storybook/global';
// eslint-disable-next-line import/no-extraneous-dependencies
import { setup } from '@storybook/vue3';
import type { VueRenderer } from 'renderers/vue3/src/types';
import type { App, Plugin } from 'vue';

const i18nPlugin: Plugin = {
  install: (app: App, options) => {
    // inject a globally available $translate() method
    // eslint-disable-next-line no-param-reassign
    app.config.globalProperties.$translate = (key: string) => {
      // retrieve a nested property in `options`
      // using `key` as the path
      // eslint-disable-next-line array-callback-return, consistent-return
      return key.split('.').reduce((o: { [x: string]: any }, i: string | number) => {
        if (o) return o[i];
      }, options);
    };
  },
};
const themeColor = 'themeColor';

// add components to global scope
setup((app: App) => {
  // This adds a component that can be used globally in stories
  app.component('GlobalButton', globalThis.Components.Button);
});

// this adds a plugin to vue app
setup((app: App, context?: StoryContext<VueRenderer>) => {
  app.use(i18nPlugin, {
    greetings: {
      hello: `Bonjour! from plugin your name is ${context?.name}!`,
    },
  });
});

// additonal setup to provide selected language to the app
setup((app: App, _context) => {
  app.provide(themeColor, 'green');
});
