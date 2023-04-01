import type {
  AnnotatedStoryFn,
  Args,
  ArgsFromMeta,
  ArgsStoryFn,
  ComponentAnnotations,
  DecoratorFunction,
  LoaderFunction,
  StoryAnnotations,
  StoryContext as GenericStoryContext,
  StrictArgs,
  ProjectAnnotations,
} from '@storybook/types';
import type { SetOptional, Simplify, RemoveIndexSignature } from 'type-fest';
import type { ComponentOptions, ConcreteComponent, FunctionalComponent, VNodeChild } from 'vue';
import type { VueRenderer } from './types';

export type { Args, ArgTypes, Parameters, StrictArgs } from '@storybook/types';
export type { VueRenderer };

/**
 * Metadata to configure the stories for a component.
 *
 * @see [Default export](https://storybook.js.org/docs/formats/component-story-format/#default-export)
 */
export type Meta<TCmpOrArgs = Args> = ComponentAnnotations<
  VueRenderer,
  ComponentPropsOrProps<TCmpOrArgs>
>;

/**
 * Story function that represents a CSFv2 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
export type StoryFn<TCmpOrArgs = Args> = AnnotatedStoryFn<
  VueRenderer,
  ComponentPropsOrProps<TCmpOrArgs>
>;

/**
 * Story function that represents a CSFv3 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
export type StoryObj<TMetaOrCmpOrArgs = Args> = TMetaOrCmpOrArgs extends {
  render?: ArgsStoryFn<VueRenderer, any>;
  component?: infer Component;
  args?: infer DefaultArgs;
}
  ? Simplify<
      ComponentProps<Component> & ArgsFromMeta<VueRenderer, TMetaOrCmpOrArgs>
    > extends infer TArgs
    ? StoryAnnotations<
        VueRenderer,
        TArgs,
        SetOptional<TArgs, Extract<keyof TArgs, keyof DefaultArgs>>
      >
    : never
  : StoryAnnotations<VueRenderer, ComponentPropsOrProps<TMetaOrCmpOrArgs>>;

type ExtractSlots<C> = C extends new (...args: any[]) => { $slots: infer T }
  ? AllowNonFunctionSlots<Partial<RemoveIndexSignature<T>>>
  : unknown;

type AllowNonFunctionSlots<Slots> = {
  [K in keyof Slots]: Slots[K] | VNodeChild;
};

export type ComponentProps<C> = C extends ComponentOptions<infer P>
  ? P & ExtractSlots<C>
  : C extends FunctionalComponent<infer P>
  ? P
  : unknown;

type ComponentPropsOrProps<TCmpOrArgs> = TCmpOrArgs extends ConcreteComponent<any>
  ? unknown extends ComponentProps<TCmpOrArgs>
    ? TCmpOrArgs
    : ComponentProps<TCmpOrArgs>
  : TCmpOrArgs;

/**
 * @deprecated Use `StoryFn` instead.
 * Use `StoryObj` if you want to migrate to CSF3, which uses objects instead of functions to represent stories.
 * You can read more about the CSF3 format here: https://storybook.js.org/blog/component-story-format-3-0/
 *
 * Story function that represents a CSFv2 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
export type Story<TArgs = Args> = StoryFn<TArgs>;

export type Decorator<TArgs = StrictArgs> = DecoratorFunction<VueRenderer, TArgs>;
export type Loader<TArgs = StrictArgs> = LoaderFunction<VueRenderer, TArgs>;
export type StoryContext<TArgs = StrictArgs> = GenericStoryContext<VueRenderer, TArgs>;
export type Preview = ProjectAnnotations<VueRenderer>;
