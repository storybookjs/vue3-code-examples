

import type { Meta, StoryObj } from '@storybook/vue3';
import { h } from 'vue';

import Button from '../Button.vue';


const meta = {
  title: 'Decorators/Conditional Decorators',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

const ComponentTemplateWrapper = () => ({
  components: { story: Button },
  template: `
    <pre>
     <story v-bind="$attrs"/>
    </pre> 
  `,
});

const SimpleTemplateWrapper = () => ({
  template: `
    <div style="border: 5px solid red;">
      <story/>
    </div>
    `,
});

const VueWrapperWrapper = (storyFn, context) => {
  // Call the `storyFn` to receive a component that Vue can render
  const story = storyFn();
  // Vue 3 "Functional" component as decorator
  return () => {
    return h('div', { style: 'border: 5px solid blue' }, h(story, context.args));
  };
};

const DynamicWrapperWrapper  = (storyFn, { args }) => ({
  template: `<div :style="{ borderWidth: level, borderColor: 'green', borderStyle: 'solid' }"><story /></div>`,
  computed: { level: () => `${args.level}px` },
});

const VueConditionalWrapperWrapper = (storyFn, context) => {
  // Call the `storyFn` to receive a component that Vue can render
  const story = storyFn();
  const animated = context.args.animate ? 'animated' : 'not-animated'; 
  console.log({animated});
  // Vue 3 "Functional" component as decorator
  return () => context.args.show ? h('div', { style: 'border: 10px solid black;padding: 20px' }, h(story, {...context.args,class:animated })):h(story,{ label: 'Disconnected',backgroundColor: 'gray'});
};

export const CComponentTemplate: Story = {
  args: { label: 'With component' },
  decorators: [ComponentTemplateWrapper],
};

export const CSimpleTemplate: Story = {
  args: { label: 'With border' },
  decorators: [SimpleTemplateWrapper],
};

export const CVueWrapper: Story = {
  args: { label: 'With Vue wrapper' },
  decorators: [VueWrapperWrapper],
};

export const CDynamicWrapper: Story = {
  args: { label: 'With dynamic wrapper', primary: true, },
  argTypes: {
    // Number type is detected, but we still want to constrain the range from 1-6
    level: { control: { type: 'range', min: 1, max: 6 } },
  },
  decorators: [DynamicWrapperWrapper],
};



export const CMultipleWrappers = {
  args: { label: 'With multiple wrappers' , show: false , animate: false},
  argTypes: {
    // Number type is detected, but we still want to constrain the range from 1-6
    level: { control: { type: 'range', min: 1, max: 6 } },
  },
  decorators: [
    VueConditionalWrapperWrapper,
    ComponentTemplateWrapper,
    SimpleTemplateWrapper,
    VueWrapperWrapper,
    DynamicWrapperWrapper,
  ],
};

