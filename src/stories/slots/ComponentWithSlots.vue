<script setup lang="ts">
const props = defineProps({
  label: String,
});
</script>
<template>
  <div >
    <h1>{{ label }}</h1>
    <div style="background-color: antiquewhite;border:solid brown 1px ;padding: 10px;">
      <h5>SLOTS :</h5>
      <header data-testid="header-slot">
        <slot name="header" :title="'Header '+ label +' title from the slot'"></slot>
      </header>
      <main data-testid="default-slot">
        <slot></slot>
      </main>
      <footer data-testid="footer-slot">
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>
