import  { type Preview , setup }  from '@storybook/vue3';
import type { App, Plugin } from 'vue'

import vuetify from '../src/plugins/vuetify'
import { loadFonts } from '../src/plugins/webfontloader'

import { withVuetifyTheme } from './withVuetifyTheme.decorator'

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




loadFonts();

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