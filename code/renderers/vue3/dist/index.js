"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  configure: () => configure,
  forceReRender: () => forceReRender,
  raw: () => raw,
  setup: () => setup,
  storiesOf: () => storiesOf
});
module.exports = __toCommonJS(src_exports);

// src/globals.ts
var import_global = require("@storybook/global");
var { window: globalWindow } = import_global.global;
globalWindow.STORYBOOK_ENV = "vue3";

// src/public-api.ts
var import_preview_api2 = require("@storybook/preview-api");

// src/decorateStory.ts
var import_vue = require("vue");
var import_preview_api = require("@storybook/preview-api");
function normalizeFunctionalComponent(options) {
  return typeof options === "function" ? { render: options, name: options.name } : options;
}
function prepare(rawStory, innerStory) {
  const story = rawStory;
  if (story === null) {
    return null;
  }
  if (typeof story === "function")
    return story;
  if (innerStory) {
    return {
      // Normalize so we can always spread an object
      ...normalizeFunctionalComponent(story),
      components: { ...story.components || {}, story: innerStory }
    };
  }
  return {
    render() {
      return (0, import_vue.h)(story);
    }
  };
}
function decorateStory(storyFn, decorators) {
  return decorators.reduce(
    (decorated, decorator) => (context) => {
      let story;
      const decoratedStory = decorator((update) => {
        story = decorated({
          ...context,
          ...(0, import_preview_api.sanitizeStoryContextUpdate)(update)
        });
        return story;
      }, context);
      if (!story)
        story = decorated(context);
      if (decoratedStory === story) {
        return story;
      }
      const innerStory = () => (0, import_vue.h)(story);
      return prepare(decoratedStory, innerStory);
    },
    (context) => prepare(storyFn(context))
  );
}

// src/render.ts
var import_vue2 = require("vue");
var render = (props, context) => {
  const { id, component: Component } = context;
  if (!Component) {
    throw new Error(
      `Unable to render story ${id} as the component annotation is missing from the default export`
    );
  }
  return () => (0, import_vue2.h)(Component, props, generateSlots(context));
};
var setupFunctions = /* @__PURE__ */ new Set();
var setup = (fn) => {
  setupFunctions.add(fn);
};
var runSetupFunctions = (app, storyContext) => {
  setupFunctions.forEach((fn) => fn(app, storyContext));
};
var map = /* @__PURE__ */ new Map();
function renderToCanvas({ storyFn, forceRemount, showMain, showException, storyContext, id }, canvasElement) {
  const existingApp = map.get(canvasElement);
  if (existingApp && !forceRemount) {
    const element = storyFn();
    const args = getArgs(element, storyContext);
    updateArgs(existingApp.reactiveArgs, args);
    return () => {
      teardown(existingApp.vueApp, canvasElement);
    };
  }
  if (existingApp && forceRemount)
    teardown(existingApp.vueApp, canvasElement);
  const vueApp = (0, import_vue2.createApp)({
    setup() {
      storyContext.args = (0, import_vue2.reactive)(storyContext.args);
      const rootElement = storyFn();
      const args = getArgs(rootElement, storyContext);
      const appState = {
        vueApp,
        reactiveArgs: (0, import_vue2.reactive)(args)
      };
      map.set(canvasElement, appState);
      return () => {
        return (0, import_vue2.h)(rootElement);
      };
    }
  });
  vueApp.config.errorHandler = (e) => showException(e);
  runSetupFunctions(vueApp, storyContext);
  vueApp.mount(canvasElement);
  showMain();
  return () => {
    teardown(vueApp, canvasElement);
  };
}
function generateSlots(context) {
  const { argTypes } = context;
  const slots = Object.entries(argTypes).filter(([key, value]) => {
    var _a2, _b;
    return ((_b = (_a2 = argTypes[key]) == null ? void 0 : _a2.table) == null ? void 0 : _b.category) === "slots";
  }).map(([key, value]) => {
    const slotValue = context.args[key];
    return [key, typeof slotValue === "function" ? slotValue : () => slotValue];
  });
  return (0, import_vue2.reactive)(Object.fromEntries(slots));
}
function getArgs(element, storyContext) {
  return element.props && (0, import_vue2.isVNode)(element) ? element.props : storyContext.args;
}
function updateArgs(reactiveArgs, nextArgs) {
  if (Object.keys(nextArgs).length === 0)
    return;
  const currentArgs = (0, import_vue2.isReactive)(reactiveArgs) ? reactiveArgs : (0, import_vue2.reactive)(reactiveArgs);
  Object.keys(currentArgs).forEach((key) => {
    if (!(key in nextArgs)) {
      delete currentArgs[key];
    }
  });
  Object.assign(currentArgs, nextArgs);
}
function teardown(storybookApp, canvasElement) {
  storybookApp == null ? void 0 : storybookApp.unmount();
  if (map.has(canvasElement))
    map.delete(canvasElement);
}

// src/public-api.ts
var RENDERER = "vue3";
var api = (0, import_preview_api2.start)(renderToCanvas, { decorateStory, render });
var storiesOf = (kind, m) => {
  return api.clientApi.storiesOf(kind, m).addParameters({
    renderer: RENDERER
  });
};
var configure = (...args) => api.configure(RENDERER, ...args);
var { forceReRender } = api;
var { raw } = api.clientApi;

// src/index.ts
var _a;
if (typeof module !== "undefined")
  (_a = module == null ? void 0 : module.hot) == null ? void 0 : _a.decline();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  configure,
  forceReRender,
  raw,
  setup,
  storiesOf
});
