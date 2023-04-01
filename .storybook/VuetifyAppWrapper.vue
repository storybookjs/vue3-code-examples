<template>
    <v-app :theme="themeName">
      <v-main>
        <slot name="story"></slot>
      </v-main>
    </v-app>
  </template>
  
<script>
  export default {
    props: {
      themeName: String,
    },
    setup(props) {
        console.log('VuetifyAppWrapper.vue props:', props.themeName )
      return { props };
    },
  };
</script>
<style>
    .v-application__wrap {
        min-height: fit-content; /* or override 100vh by vuetify */
    }
</style>