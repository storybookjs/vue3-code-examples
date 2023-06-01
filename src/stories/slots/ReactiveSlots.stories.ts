
import { h } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';

import BaseLayout from './ComponentWithSlots.vue';



const meta = {
  component: BaseLayout,
  title: 'Slots/ReactiveSlots',
  args: {
    label: 'Storybook Day',
    default: () => 'Default Text Slot',
    footer: h('p', 'Footer VNode Slot'),
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BaseLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SimpleSlotTest: Story = {
  args: {
    label: 'Storybook Day',
    header: () => h('h1', 'Header Text Slot'),
    default: () => 'Default Text Slot',
    footer: h('p', 'Footer VNode Slot'),
  }
};

export const NamedSlotTest: Story = {
  args: {
    label: 'Storybook Day',
    header: ({ title }: { title: string }) => h('h1', title),
    default: () => 'Default Text Slot',
    footer: h('p', 'Footer VNode Slot'),
  }
};

export const SlotWithRenderFn: Story = {
  args: {
    label: 'Storybook Day',
    header: ({ title }: { title: string }) => `${title}`,
    default: () => 'Default Text Slot',
    footer: h('p', 'Footer VNode Slot'),
  },
  render: (args: any) => ({
    components: { BaseLayout },
    setup() {
      return { args };
    },
    template: `<BaseLayout :label="args.label" data-testid="layout">
  	            {{args.default()}}
                <template #header="{ title }"><h1>{{args.header({title})}}</h1></template>
              </BaseLayout>`,
  })
};
