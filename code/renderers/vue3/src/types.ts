import type { StoryContext as StoryContextBase, WebRenderer } from '@storybook/types';
import type { ConcreteComponent } from 'vue';

export type { RenderContext } from '@storybook/types';

export interface ShowErrorArgs {
  title: string;
  description: string;
}

export type StoryFnVueReturnType = ConcreteComponent<any>;

export type StoryContext = StoryContextBase<VueRenderer>;

/**
 * @deprecated Use `VueRenderer` instead.
 */
export type VueFramework = VueRenderer;
export interface VueRenderer extends WebRenderer {
  // We are omitting props, as we don't use it internally, and more importantly, it completely changes the assignability of meta.component.
  // Try not omitting, and check the type errros in the test file, if you want to learn more.
  component: Omit<ConcreteComponent<this['T']>, 'props'>;
  storyResult: StoryFnVueReturnType;
}
