import { WebRenderer, ArgsStoryFn, RenderContext } from '@storybook/types';
import { ConcreteComponent } from 'vue';

type StoryFnVueReturnType = ConcreteComponent<any>;
interface VueRenderer extends WebRenderer {
    component: Omit<ConcreteComponent<this['T']>, 'props'>;
    storyResult: StoryFnVueReturnType;
}

declare const render: ArgsStoryFn<VueRenderer>;
declare const setup: (fn: (app: any) => void) => void;
declare function renderToCanvas({ storyFn, forceRemount, showMain, showException, storyContext, id }: RenderContext<VueRenderer>, canvasElement: VueRenderer['canvasElement']): () => void;

export { VueRenderer as V, renderToCanvas as a, render as r, setup as s };
