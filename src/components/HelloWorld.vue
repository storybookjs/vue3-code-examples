<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <v-icon icon="mdi-home" width="60"/> 
      
      <v-img
        contain
        height="300"
        src="@/assets/logo.svg"
      />

      <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>

      <h1 class="text-h2 font-weight-bold"> Vuetify</h1>

      <div class="py-14" />

      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-btn
            href="https://next.vuetifyjs.com/components/all/"
            min-width="164"
            rel="noopener noreferrer"
            target="_blank"
            variant="text"
          >
            <v-icon
              icon="mdi-view-dashboard"
              size="large"
              start
            />

            Components
          </v-btn>
        </v-col>

        <v-col cols="auto">
          <v-btn
            color="primary"
            href="https://next.vuetifyjs.com/introduction/why-vuetify/#feature-guides"
            min-width="228"
            rel="noopener noreferrer"
            size="x-large"
            target="_blank"
            variant="flat"
          >
            <v-icon
              icon="mdi-speedometer"
              size="large"
              start
            />

            Get Started
          </v-btn>
        </v-col>

        <v-col cols="auto">
          <v-btn
            href="#/community"
            min-width="164"
            rel="noopener noreferrer"
            target="_blank"
            variant="text"
          >
            <v-icon
              icon="mdi-account-group"
              size="large"
              start
            />

            Community
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="auto">
          <v-card
              title="Card title"
              subtitle="Subtitle"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
              variant="outlined"
              width="100%"
            >
            <v-card-actions>
              <v-btn>Click me !</v-btn>
            </v-card-actions>
          </v-card> 
        </v-col>
      </v-row>
      <v-row
        class="flex"
        justify="space-between"
      >
        <v-col cols="12">
          <v-btn @click="show = !show">
            toggle
          </v-btn>
        </v-col>
  
        <v-col
          cols="12"
          class="mt-12"
        >
          <v-tooltip
            v-model="show"
            location="top"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                icon
                v-bind="props"
              >
                <v-icon color="grey-lighten-1">
                  mdi-cart
                </v-icon>
              </v-btn>
            </template>
            <span>Programmatic tooltip</span>
          </v-tooltip>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const show = ref(false)
</script>
