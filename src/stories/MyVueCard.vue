
<script setup lang="ts">

const props=defineProps<{
  title: string
  subtitle: string
  text: string
  variant: "elevated" | "tonal" | "outlined" | "plain"
  elevation?: number
  color?: string
}>()
</script>
<template>
  <v-card
              :title="title"
              :subtitle="subtitle"
              :text="text"
              :variant="variant"
              :elevation="elevation"
              :color="color"
              width="100%"
            >
            <v-card-actions>
              <v-btn>{{  title }} </v-btn>
            </v-card-actions>
          </v-card> 
</template>