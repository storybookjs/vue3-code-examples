
<template>
  <div class="demo">
    Type a number: <input v-model.number="number" />
    <p class="big-number">{{ tweened.number.toFixed(0) }}</p>
  </div>
</template>

<style>
.big-number {
  font-weight: bold;
  font-size: 2em;
}

.demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: beige;
  border: 0cqi solid black;
}
</style>

<script lang="ts" setup>
import { ref, reactive, watch } from 'vue'
import gsap from 'gsap'

const props = defineProps<{ duration: number }>()

const number = ref(0)
const tweened = reactive({
  number: 0
})

watch(
  number,
  (n) => {
    gsap.to(tweened, { duration: props.duration, number: Number(n) || 0 })
  }
)
</script>