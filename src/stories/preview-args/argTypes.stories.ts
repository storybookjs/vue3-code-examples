
import type { PartialStoryFn, StoryContext } from '@storybook/types';
import Pre from './Pre.vue';


export default {
  component: Pre,
  // Compose all the argTypes into `object`, so the pre component only needs a single prop
  decorators: [
    (storyFn: PartialStoryFn, context: StoryContext) =>
      storyFn({ args: { object: context.argTypes } }),
  ],
  argTypes: {
    componentArg: { type: 'string' },
    storyArg: { type: 'string' },
    composedArg: { type: 'string' },
  },
};

export const Inheritance = {
  argTypes: {
    storyArg: { type: 'number' },
    composedArg: { options: ['a', 'b'] },
  }
  
};

// Check the inferred arg types from the args
export const ArgTypeInference = {
  args: {
    a: 1,
    b: '1',
    c: true,
    d: { a: 'b' },
    e: ['a', 'b'],
  }
};
