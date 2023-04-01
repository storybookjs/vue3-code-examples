import type { Meta, StoryObj } from '@storybook/vue3';

import ElStack from './ElStack.vue';

const meta: Meta<typeof ElStack> = {
  title: 'EveryLayout/Stack',
  component: ElStack,
  tags: ['autodocs'],
  args: { 
    recursive: false,
    space: '2rem',
  },
  argTypes: { 
    space: { control: 'select', options: ['1rem', '2rem', '0'] },
  },
};

export default meta;
type Story = StoryObj<typeof ElStack>;

export const Default: Story = {
  render: (args) => ({
    components: { ElStack },
    setup() {
      return {
        args,
      };
    },
    template: `
    <ElStack v-bind="args" style="min-height: 20rem">
        <div>This</div>
        <div>is</div>
        <div>just</div>
        <div>a</div>
        <div>stack</div>
    </ElStack>`
  }),
};

export const Split: Story = {
  render: (args) => ({
    components: { ElStack },
    setup() {
      return {
        args,
      };
    },
    template: `
    <ElStack v-bind="args" style="min-height: 20rem">
    <div>This</div>
    <div>is</div>
    <div>a</div>
    <div split-after>split (this element has the 'split-after' attribute)</div>
    <div>stack</div>
    </ElStack>`
  }),
};

export const Recursive: Story = {
  render: (args) => ({
    components: { ElStack },
    setup() {
      return {
        args,
      };
    },
    template: `
    <ElStack v-bind="args" style="min-height: 20rem">
    <div>This</div>
    <div>is</div>
    <div>
    <div>a</div>
    <div>recursive</div>
    </div>
    <div>stack</div>
    </ElStack>`
  }),
  args: {
    recursive: true,
  },
};