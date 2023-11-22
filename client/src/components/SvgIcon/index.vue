<template>
  <svg aria-hidden="true" :width="width" :height="height">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from "vue";
const props = defineProps({
  prefix: {
    type: String,
    default: "icon",
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "currentColor",
  },
  width: {
    type: [String, Number],
    default: "1em",
  },
  height: {
    type: [String, Number],
    default: "1em",
  },
});
const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>

<style scoped></style>
