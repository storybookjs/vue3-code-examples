// This file is a decorator that wraps the story in a VuetifyAppWrapper
import { h , shallowReactive} from 'vue';
import StoryWrapper from './VuetifyAppWrapper.vue';

export const DEFAULT_THEME = 'light';

const theme = shallowReactive({themeName:DEFAULT_THEME});

export const withVuetifyTheme = (storyFn, context) => {
  // Pull our global theme variable, fallback to DEFAULT_THEME
  theme.themeName =  context.globals.theme || DEFAULT_THEME;
  const story = storyFn();

  return () => {
    return h(
      StoryWrapper,
      // give themeName to StoryWrapper as a prop
      theme,
      {
        story: () => h(story, { ...context.args }),
      }
    );
  };
};