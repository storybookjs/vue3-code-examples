import type { Addon_ClientStoryApi, Addon_Loadable } from '@storybook/types';
import type { App } from 'vue';
import { start } from '@storybook/preview-api';

import type { VueRenderer } from './types';
import { decorateStory } from './decorateStory';

import { render, renderToCanvas } from './render';

const RENDERER = 'vue3';

interface ClientApi extends Addon_ClientStoryApi<VueRenderer['storyResult']> {
  configure(loader: Addon_Loadable, module: NodeModule): void;
  forceReRender(): void;
  raw: () => any; // todo add type
  load: (...args: any[]) => void;
  app: App;
}

const api = start<VueRenderer>(renderToCanvas, { decorateStory, render });

export const storiesOf: ClientApi['storiesOf'] = (kind, m) => {
  return (api.clientApi.storiesOf(kind, m) as ReturnType<ClientApi['storiesOf']>).addParameters({
    renderer: RENDERER,
  });
};

export const configure: ClientApi['configure'] = (...args) => api.configure(RENDERER, ...args);
export const { forceReRender } = api;
export const { raw } = api.clientApi;
export { setup } from './render';
