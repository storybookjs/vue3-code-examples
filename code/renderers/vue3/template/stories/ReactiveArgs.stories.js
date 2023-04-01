import { expect } from '@storybook/jest';
import { global as globalThis } from '@storybook/global';
import { within, userEvent } from '@storybook/testing-library';
import { UPDATE_STORY_ARGS, STORY_ARGS_UPDATED, RESET_STORY_ARGS } from '@storybook/core-events';
import ReactiveArgs from './ReactiveArgs.vue';

export default {
  component: ReactiveArgs,
  argTypes: {
    // To show that other props are passed through
    backgroundColor: { control: 'color' },
  },
};

export const ReactiveTest = {
  args: {
    label: 'Button',
  },
  // test that args are updated correctly in rective mode
  play: async ({ canvasElement, id }) => {
    const channel = globalThis.__STORYBOOK_ADDONS_CHANNEL__;
    const canvas = within(canvasElement);

    await channel.emit(RESET_STORY_ARGS, { storyId: id });
    await new Promise((resolve) => {
      channel.once(STORY_ARGS_UPDATED, resolve);
    });
    const reactiveButton = await canvas.getByRole('button');
    await expect(reactiveButton).toHaveTextContent('Button 0');

    await userEvent.click(reactiveButton); // click to update the label to increment the count + 1
    await channel.emit(UPDATE_STORY_ARGS, {
      storyId: id,
      updatedArgs: { label: 'updated' },
    });
    await new Promise((resolve) => {
      channel.once(STORY_ARGS_UPDATED, resolve);
    });
    await expect(canvas.getByRole('button')).toHaveTextContent('updated 1');

    await userEvent.click(reactiveButton); // click to update the label to increment the count + 1
    await expect(reactiveButton).toHaveTextContent('updated 2');
  },
};

export const ReactiveHtmlWrapper = {
  args: { label: 'Wrapped Button' },

  decorators: [
    () => ({
      template: `
        <div style="border: 5px solid red;">
          <story/>
        </div>
        `,
    }),
  ],
  play: async ({ canvasElement, id }) => {
    const channel = globalThis.__STORYBOOK_ADDONS_CHANNEL__;
    const canvas = within(canvasElement);

    await channel.emit(RESET_STORY_ARGS, { storyId: id });
    await new Promise((resolve) => {
      channel.once(STORY_ARGS_UPDATED, resolve);
    });
    const reactiveButton = await canvas.getByRole('button');
    await expect(reactiveButton).toHaveTextContent('Wrapped Button 0');

    await userEvent.click(reactiveButton); // click to update the label to increment the count + 1
    await channel.emit(UPDATE_STORY_ARGS, {
      storyId: id,
      updatedArgs: { label: 'updated Wrapped Button' },
    });
    await new Promise((resolve) => {
      channel.once(STORY_ARGS_UPDATED, resolve);
    });
    await expect(canvas.getByRole('button')).toHaveTextContent('updated Wrapped Button 1');

    await userEvent.click(reactiveButton); // click to update the label to increment the count + 1
    await expect(reactiveButton).toHaveTextContent('updated Wrapped Button 2');
  },
};

// to test that Simple html Decorators in CSF2 format are applied correctly in reactive mode
export const ReactiveCSF2Wrapper = (args, { argTypes }) => ({
  components: { ReactiveArgs },
  props: Object.keys(argTypes),
  template: '<ReactiveArgs v-bind="$props" />',
});

ReactiveCSF2Wrapper.args = {
  label: 'CSF2 Wrapped Button',
};
ReactiveCSF2Wrapper.decorators = [
  () => ({
    template: `
      <div style="border: 5px solid red;">
        <story/>
      </div>
      `,
  }),
];

ReactiveCSF2Wrapper.play = async ({ canvasElement, id }) => {
  const channel = globalThis.__STORYBOOK_ADDONS_CHANNEL__;
  const canvas = within(canvasElement);

  await channel.emit(RESET_STORY_ARGS, { storyId: id });
  await new Promise((resolve) => {
    channel.once(STORY_ARGS_UPDATED, resolve);
  });
  const reactiveButton = await canvas.getByRole('button');
  await expect(reactiveButton).toHaveTextContent('CSF2 Wrapped Button 0');

  await userEvent.click(reactiveButton); // click to update the label to increment the count + 1
  await channel.emit(UPDATE_STORY_ARGS, {
    storyId: id,
    updatedArgs: { label: 'updated CSF2 Wrapped Button' },
  });
  await new Promise((resolve) => {
    channel.once(STORY_ARGS_UPDATED, resolve);
  });
  await expect(canvas.getByRole('button')).toHaveTextContent('updated CSF2 Wrapped Button 1');

  await userEvent.click(reactiveButton); // click to update the label to increment the count + 1
  await expect(reactiveButton).toHaveTextContent('updated CSF2 Wrapped Button 2');
};
