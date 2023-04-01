var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/decorateStory.ts
import { isVNode, h } from "vue";
import { sanitizeStoryContextUpdate } from "@storybook/preview-api";
function normalizeFunctionalComponent(options) {
  return typeof options === "function" ? { render: options, name: options.name } : options;
}
function prepare(rawStory, innerStory) {
  const story = normalizeFunctionalComponent(rawStory);
  if (story == null) {
    return null;
  }
  if (innerStory) {
    return {
      // Normalize so we can always spread an object
      ...normalizeFunctionalComponent(story),
      components: { ...story.components || {}, story: innerStory }
    };
  }
  return {
    render() {
      return h(story);
    }
  };
}
function decorateStory(storyFn, decorators) {
  return decorators.reduce(
    (decorated, decorator) => (context) => {
      let story = { isNull: true };
      const decoratedStory = decorator((update) => {
        story = decorated({
          ...context,
          ...sanitizeStoryContextUpdate(update)
        });
        const argsChanged = update && update.args && Object.keys(update).length === 1 && !isVNode(story);
        if (argsChanged) {
          story = h(story, update.args);
        }
        return story;
      }, context);
      if (story.isNull)
        story = decorated(context);
      if (decoratedStory === story) {
        return story;
      }
      const props = story.props ?? context.args;
      const innerStory = () => h(story, props);
      return prepare(decoratedStory, innerStory);
    },
    (context) => prepare(storyFn(context))
  );
}

// src/render.ts
import { createApp, h as h2, isReactive, reactive } from "vue";
var render = (props, context) => {
  const { id, component: Component } = context;
  if (!Component) {
    throw new Error(
      `Unable to render story ${id} as the component annotation is missing from the default export`
    );
  }
  return h2(Component, props, generateSlots(context));
};
var setupFunction = (_app) => {
};
var setup = (fn) => {
  setupFunction = fn;
};
var map = /* @__PURE__ */ new Map();
function renderToCanvas({ storyFn, forceRemount, showMain, showException, storyContext, id }, canvasElement) {
  const existingApp = map.get(canvasElement);
  if (existingApp && !forceRemount) {
    const element = storyFn();
    updateArgs(existingApp.reactiveArgs, element.props ?? storyContext.args);
    return () => {
      teardown(existingApp.vueApp, canvasElement);
    };
  }
  if (existingApp && forceRemount)
    teardown(existingApp.vueApp, canvasElement);
  const vueApp = createApp({
    setup() {
      storyContext.args = reactive(storyContext.args);
      const rootElement = storyFn();
      const appState = {
        vueApp,
        reactiveArgs: reactive(rootElement.props ?? storyContext.args)
      };
      map.set(canvasElement, appState);
      return () => {
        return h2(rootElement, appState.reactiveArgs);
      };
    }
  });
  vueApp.config.errorHandler = (e) => showException(e);
  setupFunction(vueApp);
  vueApp.mount(canvasElement);
  showMain();
  return () => {
    teardown(vueApp, canvasElement);
  };
}
function generateSlots(context) {
  const { argTypes } = context;
  const slots = Object.entries(argTypes).filter(([key, value]) => argTypes[key]?.table?.category === "slots").map(([key, value]) => {
    const slotValue = context.args[key];
    return [key, typeof slotValue === "function" ? slotValue : () => slotValue];
  });
  return reactive(Object.fromEntries(slots));
}
function updateArgs(reactiveArgs, nextArgs) {
  if (Object.keys(nextArgs).length === 0)
    return;
  const currentArgs = isReactive(reactiveArgs) ? reactiveArgs : reactive(reactiveArgs);
  Object.keys(currentArgs).forEach((key) => {
    if (!(key in nextArgs)) {
      delete currentArgs[key];
    }
  });
  Object.assign(currentArgs, nextArgs);
}
function teardown(storybookApp, canvasElement) {
  storybookApp?.unmount();
  if (map.has(canvasElement))
    map.delete(canvasElement);
}

export {
  __commonJS,
  __toESM,
  decorateStory,
  render,
  setup,
  renderToCanvas
};
