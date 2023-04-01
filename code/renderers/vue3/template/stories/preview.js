import { global as globalThis } from '@storybook/global';
// eslint-disable-next-line import/no-extraneous-dependencies
import { setup } from '@storybook/vue3';

// TODO: I'd like to be able to export rather than imperatively calling an imported function
// export const setup = (app) => {
//   app.component('GlobalButton', Button);
// };

setup((app) => {
  // This adds a component that can be used globally in stories
  app.component('GlobalButton', globalThis.Components.Button);
});
