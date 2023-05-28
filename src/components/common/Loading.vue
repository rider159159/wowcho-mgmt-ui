<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { requestStore } from '@/stores'

const requestStoreInstance = requestStore()
const { loadingArray } = storeToRefs(requestStoreInstance)
const isLoading = computed(() => loadingArray.value.length > 0)

</script>

<template>
  <div v-show="isLoading" class="fixed top-0 left-0 flex flex-col items-center justify-center  w-full h-full bg-black/40 z-500">
    <svg class="spinner">
    <circle>
      <animateTransform attributeName="transform" type="rotate" values="-90;810" keyTimes="0;1" dur="2s" repeatCount="indefinite"></animateTransform>
      <animate attributeName="stroke-dashoffset" values="0%;0%;-157.080%" calcMode="spline" keySplines="0.61, 1, 0.88, 1; 0.12, 0, 0.39, 0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"></animate>
      <animate attributeName="stroke-dasharray" values="0% 314.159%;157.080% 157.080%;0% 314.159%" calcMode="spline" keySplines="0.61, 1, 0.88, 1; 0.12, 0, 0.39, 0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"></animate>
    </circle>
    </svg>
  </div>
</template>

<style lang="scss" scoped>

.spinner {
  box-sizing: border-box;
  width: 60px;
  height: 60px;
  padding: 6px / 2;
  overflow: visible;

  > circle {
    fill: none;
    stroke: currentColor;
    cx: 50%;
    cy: 50%;
    r: 50%;
    stroke-width: 6px;
    stroke-linecap: round;
    transform-origin: center;
  }
}
</style>
