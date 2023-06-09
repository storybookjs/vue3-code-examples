import type { Meta, StoryFn} from '@storybook/vue3';

import Button from '../Button.vue';
import { h } from 'vue';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/vue/writing-stories/introduction
const meta = {
  title: 'CSF2/Button',
  component: Button,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/7.0/vue/writing-docs/docs-page
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    backgroundColor: { control: 'color' },
    onClick: { action: 'clicked' },
  },
  args: { primary: false }, // default value
} satisfies Meta<typeof Button>;

export default meta;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/7.0/vue/api/csf
 * to learn how to use render functions.
 */


type CSF2Story = StoryFn<typeof Button>;

export const CSF2Button: CSF2Story = (args, { argTypes }) => ({
  components: { Button },
  props: Object.keys(argTypes),
  template: '<Button v-bind="$props" ></Button>',
})

CSF2Button.args = {
  label: 'Button',
};

export const CSF2WithDecorator: CSF2Story = (args, { argTypes }) => ({
  components: { Button },
  props: Object.keys(argTypes),
  template: '<Button v-bind="$props" ></Button>',
})
CSF2WithDecorator.args = {
  label : 'CSF 2 With Decorator'
}
CSF2WithDecorator.decorators =[  
  () => ({
    template: '<div style="display: flex; padding: 20px; background-color: #cccc72;"><story /></div>',
  }),
];

export const CSF2ButtonWithFnDecorator: CSF2Story = (args, { argTypes }) => ({
  components: { Button },
  props: Object.keys(argTypes),
  template: '<Button v-bind="$props" ></Button>',
})
CSF2ButtonWithFnDecorator.args = {
  label : 'CSF 2 With Functional Decorator'
}

CSF2ButtonWithFnDecorator.decorators = [
  (storyFn,context) => {
    // Call the `storyFn` to receive a component that Vue can render
    const story = storyFn();
    // Vue 3 "Functional" component as decorator
    return () => {
      return h('div', { style: 'border: 2px solid blue;padding:10px' }, h(story,context.args));
    };
  },
]