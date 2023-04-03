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
  };
</script>
<style>
    .v-application__wrap {
        min-height: fit-content; /* or override 100vh by vuetify */
    }
</style>