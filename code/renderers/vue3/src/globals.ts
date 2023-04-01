import { global } from '@storybook/global';

const { window: globalWindow } = global;

globalWindow.STORYBOOK_ENV = 'vue3';
