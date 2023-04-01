import * as lib_docs_tools_dist from 'lib/docs-tools/dist';
import * as lib_types_dist from 'lib/types/dist';
import { V as VueRenderer } from './render-189b3692.js';
export { r as render, a as renderToCanvas } from './render-189b3692.js';
import { LegacyStoryFn, DecoratorFunction } from '@storybook/types';
import 'vue';

declare const decorators: ((storyFn: any, context: lib_types_dist.StoryContext<lib_types_dist.Renderer, lib_types_dist.Args>) => any)[];
declare const argTypesEnhancers: (<TRenderer extends lib_types_dist.Renderer>(context: lib_types_dist.StoryContextForEnhancers<TRenderer, lib_types_dist.Args>) => lib_types_dist.StrictArgTypes<lib_types_dist.Args>)[];

declare function decorateStory(storyFn: LegacyStoryFn<VueRenderer>, decorators: DecoratorFunction<VueRenderer>[]): LegacyStoryFn<VueRenderer>;

declare const parameters: {
    docs: {
        story: {
            inline: boolean;
        };
        extractArgTypes: lib_docs_tools_dist.ArgTypesExtractor;
        extractComponentDescription: typeof lib_docs_tools_dist.extractComponentDescription;
    };
    renderer: "vue3";
};

export { decorateStory as applyDecorators, argTypesEnhancers, decorators, parameters };
