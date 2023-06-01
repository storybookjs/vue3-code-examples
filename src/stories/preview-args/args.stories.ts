
import type { PartialStoryFn, StoryContext } from '@storybook/types';import { within } from '@storybook/testing-library';
import Pre from './Pre.vue';
import { pick } from 'lodash';


export default {
  component: Pre,
  args: {
    componentArg: 'componentArg',
    storyArg: 'componentStoryArg',
    object: {
      a: 'component',
      b: 'component',
    },
  },
  // Compose the set of  args into `object`, so the pre component only needs a single prop
  //   (selecting only the args specified on parameters.argNames if set)
  decorators: [
    (storyFn: PartialStoryFn, context: StoryContext) => {
      const { argNames } = context.parameters;
      const object = argNames ? pick(context.args, argNames) : context.args;
      return storyFn({ args: { object } });
    },
  ],
};

export const Inheritance = {
  args: {
    storyArg: 'storyArg',
    object: {
      a: 'story',
    },
  }
};

export const Targets = {
  args: {
    a: 'a',
    b: 'b',
  },
  argTypes: {
    a: { target: 'elsewhere' },
  },
  parameters: { argNames: ['a', 'b'] },
 
};
