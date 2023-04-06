import { inject } from 'vue';
import { expect } from '@storybook/jest';
import { global as globalThis } from '@storybook/global';
import { within, userEvent } from '@storybook/testing-library';
import { UPDATE_STORY_ARGS, STORY_ARGS_UPDATED, RESET_STORY_ARGS } from '@storybook/core-events';
import GlobalSetup from './GlobalSetup.vue';

export default {
  component: GlobalSetup,
  argTypes: {},
  render: (args) => ({
    // Components used in your story `template` are defined in the `components` object
    components: { GlobalSetup },
    // The story's `args` need to be mapped into the template through the `setup()` method
    setup() {
      const themeColor = inject('themeColor', 'red'); // <-- this is the global setup from .storybook/preview.ts
      return { args: { ...args, backgroundColor: themeColor } };
    },
    // And then the `args` are bound to your component with `v-bind="args"`
    template: `<global-setup v-bind="args" />`,
  }),
};

export const Primary = {
  args: {
    primary: true,
    label: 'Global Setup Injected themeColor',
  },
  play: async ({ canvasElement, id }) => {
    const channel = globalThis.__STORYBOOK_ADDONS_CHANNEL__;
    const canvas = within(canvasElement);

    const button = await canvas.getByRole('button');
    console.log('button', button);
    await expect(button).toHaveStyle('background-color: rgb(0, 128, 0)'); // <-- this provide themeColor = green from .storybook/preview.ts
    const h4 = await canvas.getByRole('heading', { level: 4 });
    await expect(h4).toHaveTextContent('Bonjour! from plugin your name is Primary!');
  },
};

export const Secondary = {
  args: {
    label: 'Global Setup Injected themeColor',
  },
};
