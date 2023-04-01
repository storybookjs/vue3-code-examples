import * as _storybook_types from '@storybook/types';
import { Addon_ClientStoryApi, Addon_Loadable, Args, ComponentAnnotations, AnnotatedStoryFn, ArgsStoryFn, ArgsFromMeta, StoryAnnotations, StrictArgs, DecoratorFunction, LoaderFunction, StoryContext as StoryContext$1, ProjectAnnotations } from '@storybook/types';
export { ArgTypes, Args, Parameters, StrictArgs } from '@storybook/types';
import { App, ComponentOptions, FunctionalComponent, ConcreteComponent, VNodeChild } from 'vue';
import { V as VueRenderer } from './render-189b3692.js';
export { s as setup } from './render-189b3692.js';
import { Simplify, SetOptional, RemoveIndexSignature } from 'type-fest';

interface ClientApi extends Addon_ClientStoryApi<VueRenderer['storyResult']> {
    configure(loader: Addon_Loadable, module: NodeModule): void;
    forceReRender(): void;
    raw: () => any;
    load: (...args: any[]) => void;
    app: App;
}
declare const storiesOf: ClientApi['storiesOf'];
declare const configure: ClientApi['configure'];
declare const forceReRender: () => void;
declare const raw: ((...args: any[]) => never) | (() => _storybook_types.BoundStory<VueRenderer>[] | undefined);

/**
 * Metadata to configure the stories for a component.
 *
 * @see [Default export](https://storybook.js.org/docs/formats/component-story-format/#default-export)
 */
type Meta<TCmpOrArgs = Args> = ComponentAnnotations<VueRenderer, ComponentPropsOrProps<TCmpOrArgs>>;
/**
 * Story function that represents a CSFv2 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
type StoryFn<TCmpOrArgs = Args> = AnnotatedStoryFn<VueRenderer, ComponentPropsOrProps<TCmpOrArgs>>;
/**
 * Story function that represents a CSFv3 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
type StoryObj<TMetaOrCmpOrArgs = Args> = TMetaOrCmpOrArgs extends {
    render?: ArgsStoryFn<VueRenderer, any>;
    component?: infer Component;
    args?: infer DefaultArgs;
} ? Simplify<ComponentProps<Component> & ArgsFromMeta<VueRenderer, TMetaOrCmpOrArgs>> extends infer TArgs ? StoryAnnotations<VueRenderer, TArgs, SetOptional<TArgs, Extract<keyof TArgs, keyof DefaultArgs>>> : never : StoryAnnotations<VueRenderer, ComponentPropsOrProps<TMetaOrCmpOrArgs>>;
type ExtractSlots<C> = C extends new (...args: any[]) => {
    $slots: infer T;
} ? AllowNonFunctionSlots<Partial<RemoveIndexSignature<T>>> : unknown;
type AllowNonFunctionSlots<Slots> = {
    [K in keyof Slots]: Slots[K] | VNodeChild;
};
type ComponentProps<C> = C extends ComponentOptions<infer P> ? P & ExtractSlots<C> : C extends FunctionalComponent<infer P> ? P : unknown;
type ComponentPropsOrProps<TCmpOrArgs> = TCmpOrArgs extends ConcreteComponent<any> ? unknown extends ComponentProps<TCmpOrArgs> ? TCmpOrArgs : ComponentProps<TCmpOrArgs> : TCmpOrArgs;
/**
 * @deprecated Use `StoryFn` instead.
 * Use `StoryObj` if you want to migrate to CSF3, which uses objects instead of functions to represent stories.
 * You can read more about the CSF3 format here: https://storybook.js.org/blog/component-story-format-3-0/
 *
 * Story function that represents a CSFv2 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
type Story<TArgs = Args> = StoryFn<TArgs>;
type Decorator<TArgs = StrictArgs> = DecoratorFunction<VueRenderer, TArgs>;
type Loader<TArgs = StrictArgs> = LoaderFunction<VueRenderer, TArgs>;
type StoryContext<TArgs = StrictArgs> = StoryContext$1<VueRenderer, TArgs>;
type Preview = ProjectAnnotations<VueRenderer>;

export { ComponentProps, Decorator, Loader, Meta, Preview, Story, StoryContext, StoryFn, StoryObj, VueRenderer, configure, forceReRender, raw, storiesOf };
