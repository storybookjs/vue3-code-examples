import {
  decorateStory,
  render,
  renderToCanvas,
  setup
} from "./chunk-BC6D4WSH.mjs";

// src/globals.ts
import { global } from "@storybook/global";
var { window: globalWindow } = global;
globalWindow.STORYBOOK_ENV = "vue3";

// src/public-api.ts
import { start } from "@storybook/preview-api";
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
module?.hot?.decline();
export {
  configure,
  forceReRender,
  raw,
  setup,
  storiesOf
};
