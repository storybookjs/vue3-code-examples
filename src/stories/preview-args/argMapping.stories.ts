
import type { PartialStoryFn, StoryContext } from '@storybook/types';
import Pre from './Pre.vue';


const arrows = {
  ArrowUp: { name: 'ArrowUp' },
  ArrowDown: { name: 'ArrowDown' },
  ArrowLeft: { name: 'ArrowLeft' },
  ArrowRight: { name: 'ArrowRight' },
};

const labels = {
  ArrowUp: 'Up',
  ArrowDown: 'Down',
  ArrowLeft: 'Left',
  ArrowRight: 'Right',
};

export default {
  component: Pre,
  decorators: [
    (storyFn: PartialStoryFn, context: StoryContext) => {
      return storyFn({
        args: { object: context.args  },
      });
    },
  ],
};

export const Single = {
  args: {
    mappingArg: 'ArrowRight',
  },
  argTypes: {
    mappingArg: {
      options: Object.keys(arrows),
      mapping: arrows,
      control: {
        type: 'select',
        labels,
      },
    },
  }
};

export const Multiple = {
  args: {
    mappingArg: ['ArrowRight', 'ArrowLeft'],
  },
  argTypes: {
    mappingArg: {
      options: Object.keys(arrows),
      mapping: arrows,
      control: {
        type: 'multi-select',
        labels,
      },
    },
  },
 
  
};
