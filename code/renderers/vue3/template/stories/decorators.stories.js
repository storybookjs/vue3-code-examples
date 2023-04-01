import { global as globalThis } from '@storybook/global';
import { h } from 'vue';

const { Button, Pre } = globalThis.Components;

export default {
  component: Button,
};

export const ComponentTemplate = {
  args: { label: 'With component' },
  decorators: [
    () => ({
      components: {
        Pre,
      },
      template: `
        <Pre text="decorator" />
        <story/>
      `,
    }),
  ],
};

export const SimpleTemplate = {
  args: { label: 'With border' },
  decorators: [
    () => ({
      template: `
        <div style="border: 5px solid red;">
          <story/>
        </div>
        `,
    }),
  ],
};

export const VueWrapper = {
  args: { label: 'With Vue wrapper' },
  decorators: [
    (storyFn) => {
      // Call the `storyFn` to receive a component that Vue can render
      const story = storyFn();
      // Vue 3 "Functional" component as decorator
      return () => {
        return h('div', { style: 'border: 2px solid blue' }, h(story));
      };
    },
  ],
};

export const DynamicWrapper = {
  args: { label: 'With dynamic wrapper', primary: true },
  argTypes: {
    // Number type is detected, but we still want to constrain the range from 1-6
    level: { control: { type: 'range', min: 1, max: 6 } },
  },
  decorators: [
    (storyFn, { args }) => ({
      template: `<div :style="{ borderWidth: level, borderColor: 'red', borderStyle: 'solid' }"><story /></div>`,
      data() {
        return { level: `${args.level}px` };
      },
    }),
  ],
};
