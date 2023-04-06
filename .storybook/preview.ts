import  { type Preview , setup, VueRenderer }  from '@storybook/vue3';
import type { App, Plugin } from 'vue'

import vuetify from '../src/plugins/vuetify'
import { loadFonts } from '../src/plugins/webfontloader'
import { withVuetifyTheme } from './withVuetifyTheme.decorator'
import { StoryContext } from '@storybook/types';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light',
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};


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
loadFonts();
// this adds a plugin to vue app
setup((app: App, context?: StoryContext<VueRenderer>) => {
  app.use(i18nPlugin, {
    greetings: {
      hello: `Bonjour! from plugin your name is ${context?.name}!`,
    },
  });
});
setup((app:App) => {
  app.use(vuetify);
})

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    toolbar: {
      icon: 'paintbrush',
      // Array of plain string values or MenuItem shape
      items: [
        { value: 'light', title: 'Light', left: '🌞' },
        { value: 'dark', title: 'Dark', left: '🌛' },
      ],
      // Change title based on selected value
      dynamicTitle: true,
    },
  },
};

export const decorators = [withVuetifyTheme]
export default preview;
