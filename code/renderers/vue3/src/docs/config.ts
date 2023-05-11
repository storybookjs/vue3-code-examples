import type { Addon_DecoratorFunction, ArgTypesEnhancer } from '@storybook/types';
import { extractComponentDescription, enhanceArgTypes } from '@storybook/docs-tools';
import { extractArgTypes } from './extractArgTypes';
import { sourceDecorator } from './sourceDecorator';

export const parameters: {} = {
  docs: {
    story: { inline: true },
    extractArgTypes,
    extractComponentDescription,
  },
};

export const decorators: Addon_DecoratorFunction<unknown>[] = [sourceDecorator];

export const argTypesEnhancers: ArgTypesEnhancer[] = [enhanceArgTypes];
