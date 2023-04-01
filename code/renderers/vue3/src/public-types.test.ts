import { satisfies } from '@storybook/core-common';
import type { ComponentAnnotations, StoryAnnotations } from '@storybook/types';
import { expectTypeOf } from 'expect-type';
import type { SetOptional } from 'type-fest';
import { h } from 'vue';
import type { ComponentOptions, FunctionalComponent, VNodeChild } from 'vue';
import type { Decorator, Meta, StoryObj } from './public-types';
import type { VueRenderer } from './types';
import BaseLayout from './__tests__/BaseLayout.vue';
import Button from './__tests__/Button.vue';
import DecoratorTsVue from './__tests__/Decorator.vue';
import Decorator2TsVue from './__tests__/Decorator2.vue';

describe('Meta', () => {
  test('Generic parameter of Meta can be a component', () => {
    const meta: Meta<typeof Button> = {
      component: Button,
      args: { label: 'good', disabled: false },
    };

    expectTypeOf(meta).toEqualTypeOf<
      ComponentAnnotations<
        VueRenderer,
        {
          readonly disabled: boolean;
          readonly label: string;
          onMyChangeEvent?: (id: number) => any;
          onMyClickEvent?: (id: number) => any;
        }
      >
    >();
  });

  test('Generic parameter of Meta can be the props of the component', () => {
    const meta: Meta<{ disabled: boolean; label: string }> = {
      component: Button,
      args: { label: 'good', disabled: false },
    };

    expectTypeOf(meta).toEqualTypeOf<
      ComponentAnnotations<VueRenderer, { disabled: boolean; label: string }>
    >();
  });

  test('Events are inferred from component', () => {
    const meta: Meta<typeof Button> = {
      component: Button,
      args: {
        label: 'good',
        disabled: false,
        onMyChangeEvent: (value) => {
          expectTypeOf(value).toEqualTypeOf<number>();
        },
      },
      render: (args) => {
        return h(Button, {
          ...args,
          onMyChangeEvent: (value) => {
            expectTypeOf(value).toEqualTypeOf<number>();
          },
        });
      },
    };
    expectTypeOf(meta).toMatchTypeOf<Meta<typeof Button>>();
  });
});

describe('StoryObj', () => {
  type ButtonProps = {
    readonly disabled: boolean;
    readonly label: string;
    onMyChangeEvent?: ((id: number) => any) | undefined;
    onMyClickEvent?: ((id: number) => any) | undefined;
  };

  test('✅ Required args may be provided partial in meta and the story', () => {
    const meta = satisfies<Meta<typeof Button>>()({
      component: Button,
      args: { label: 'good' },
    });

    type Actual = StoryObj<typeof meta>;
    type Expected = StoryAnnotations<VueRenderer, ButtonProps, SetOptional<ButtonProps, 'label'>>;
    expectTypeOf<Actual>().toEqualTypeOf<Expected>();
  });

  test('❌ The combined shape of meta args and story args must match the required args.', () => {
    {
      const meta = satisfies<Meta<typeof Button>>()({ component: Button });

      type Expected = StoryAnnotations<VueRenderer, ButtonProps, ButtonProps>;
      expectTypeOf<StoryObj<typeof meta>>().toEqualTypeOf<Expected>();
    }
    {
      const meta = satisfies<Meta<typeof Button>>()({
        component: Button,
        args: { label: 'good' },
      });
      // @ts-expect-error disabled not provided ❌
      const Basic: StoryObj<typeof meta> = {};

      type Expected = StoryAnnotations<VueRenderer, ButtonProps, SetOptional<ButtonProps, 'label'>>;
      expectTypeOf(Basic).toEqualTypeOf<Expected>();
    }
    {
      const meta = satisfies<Meta<{ label: string; disabled: boolean }>>()({ component: Button });
      const Basic: StoryObj<typeof meta> = {
        // @ts-expect-error disabled not provided ❌
        args: { label: 'good' },
      };

      type Expected = StoryAnnotations<VueRenderer, ButtonProps, ButtonProps>;
      expectTypeOf(Basic).toEqualTypeOf<Expected>();
    }
  });

  test('Component can be used as generic parameter for StoryObj', () => {
    expectTypeOf<StoryObj<typeof Button>>().toEqualTypeOf<
      StoryAnnotations<VueRenderer, ButtonProps>
    >();
  });
});

type ThemeData = 'light' | 'dark';

type ComponentProps<Component> = Component extends ComponentOptions<infer P>
  ? P
  : Component extends FunctionalComponent<infer P>
  ? P
  : never;

describe('Story args can be inferred', () => {
  test('Correct args are inferred when type is widened for render function', () => {
    type Props = ComponentProps<typeof Button> & { theme: ThemeData };

    const meta = satisfies<Meta<Props>>()({
      component: Button,
      args: { disabled: false },
      render: (args) => {
        return h('div', [h('div', `Use the theme ${args.theme}`), h(Button, args)]);
      },
    });

    const Basic: StoryObj<typeof meta> = { args: { theme: 'light', label: 'good' } };

    type Expected = StoryAnnotations<VueRenderer, Props, SetOptional<Props, 'disabled'>>;
    expectTypeOf(Basic).toEqualTypeOf<Expected>();
  });

  const withDecorator: Decorator<{ decoratorArg: string }> = (
    storyFn,
    { args: { decoratorArg } }
  ) => h(DecoratorTsVue, { decoratorArg }, h(storyFn()));

  test('Correct args are inferred when type is widened for decorators', () => {
    type Props = ComponentProps<typeof Button> & { decoratorArg: string };

    const meta = satisfies<Meta<Props>>()({
      component: Button,
      args: { disabled: false },
      decorators: [withDecorator],
    });

    const Basic: StoryObj<typeof meta> = { args: { decoratorArg: 'title', label: 'good' } };

    type Expected = StoryAnnotations<VueRenderer, Props, SetOptional<Props, 'disabled'>>;
    expectTypeOf(Basic).toEqualTypeOf<Expected>();
  });

  test('Correct args are inferred when type is widened for multiple decorators', () => {
    type Props = ComponentProps<typeof Button> & { decoratorArg: string; decoratorArg2: string };

    const secondDecorator: Decorator<{ decoratorArg2: string }> = (
      storyFn,
      { args: { decoratorArg2 } }
    ) => h(Decorator2TsVue, { decoratorArg2 }, h(storyFn()));

    const meta = satisfies<Meta<Props>>()({
      component: Button,
      args: { disabled: false },
      decorators: [withDecorator, secondDecorator],
    });

    const Basic: StoryObj<typeof meta> = {
      args: { decoratorArg: '', decoratorArg2: '', label: 'good' },
    };

    type Expected = StoryAnnotations<VueRenderer, Props, SetOptional<Props, 'disabled'>>;
    expectTypeOf(Basic).toEqualTypeOf<Expected>();
  });
});

test('Infer type of slots', () => {
  const meta = {
    component: BaseLayout,
  } satisfies Meta<typeof BaseLayout>;

  const Basic: StoryObj<typeof meta> = {
    args: {
      otherProp: true,
      header: ({ title }) =>
        h({
          components: { Button },
          template: `<Button :primary='true' label='${title}'></Button>`,
        }),
      default: 'default slot',
      footer: h(Button, { disabled: true, label: 'footer' }),
    },
  };

  type Props = {
    readonly otherProp: boolean;
    header?: ((headerProps: { title: string }) => any) | VNodeChild;
    default?: ((defaultProps: {}) => any) | VNodeChild;
    footer?: ((footerProps: {}) => any) | VNodeChild;
  };

  type Expected = StoryAnnotations<VueRenderer, Props, Props>;
  expectTypeOf(Basic).toEqualTypeOf<Expected>();
});
