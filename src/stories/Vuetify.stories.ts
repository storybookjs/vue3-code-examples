import type { Meta, StoryObj } from '@storybook/vue3';

import MyHeader from './Header.vue';
import MyVueCard from './MyVueCard.vue';



const meta = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/7.0/vue/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Vuetify/Vuetify',
  component: MyVueCard,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: 'fullscreen',
  },
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/7.0/vue/writing-docs/docs-page
  tags: ['autodocs'],
} satisfies Meta<typeof MyHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VueCardElevation12: Story = {
  args: {
    elevation:12,
    title:'Storybook Vuetify VCard elevation 12',
    subtitle:'This is a VCard with elevation 12',
    text:'This is a VCard with elevation 12 outlined with primary color',
    variant:'outlined',
    color:'primary',

  },
};

export const VueCardElevation1: Story = {
  args: {
    elevation:1,
    title:'Storybook Vuetify VCard elevation 1',
    subtitle:'This is a VCard with elevation 1',
    text:'This is a VCard with elevation 1 plain with primary color',
    variant:'plain',
    color:'secondary',

  },
};




