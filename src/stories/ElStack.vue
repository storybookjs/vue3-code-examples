<script lang="ts" setup>
import { withDefaults } from 'vue';
withDefaults(
  defineProps<{
    recursive?: boolean;
    space?: string;
  }>(),
  {
    recursive: false,
    space: '1.5rem',
  }
);
</script>

<template>
<div :class="{ 
  'el-stack': true,
  'el-stack--recursive': recursive
  }">
  <slot></slot>
</div>
</template>

<style>
.el-stack {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.el-stack > * + * {
  margin-block-start: v-bind('space');
}

.el-stack.el-stack--recursive * + * {
  margin-block-start: v-bind('space');
}
</style>

<style scoped>
.el-stack > :slotted([split-after]:not([split-after="false"])) {
  margin-block-end: auto;
}
</style>