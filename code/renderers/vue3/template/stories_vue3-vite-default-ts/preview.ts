declare module 'vue' {
  interface ComponentCustomProperties {
    $greetingMessage: (key: string) => string;
  }
}

declare global {
  // eslint-disable-next-line no-var,vars-on-top
  var Components: Record<string, any>;
}

export default {};
