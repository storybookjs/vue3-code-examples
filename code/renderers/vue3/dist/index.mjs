import { renderToCanvas, decorateStory, render } from './chunk-VO4KG7P2.mjs';
export { setup } from './chunk-VO4KG7P2.mjs';
import { global } from '@storybook/global';
import { start } from '@storybook/preview-api';

var { window: globalWindow } = global;
globalWindow.STORYBOOK_ENV = "vue3";
var RENDERER = "vue3";
var api = start(renderToCanvas, { decorateStory, render });
var storiesOf = (kind, m) => {
  return api.clientApi.storiesOf(kind, m).addParameters({
    renderer: RENDERER
  });
};
var configure = (...args) => api.configure(RENDERER, ...args);
var { forceReRender } = api;
var { raw } = api.clientApi;

// src/index.ts
if (typeof module !== "undefined")
  module?.hot?.decline();

export { configure, forceReRender, raw, storiesOf };
