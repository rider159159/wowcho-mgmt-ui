<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
const layout = computed(() => route.meta.layout || null)

</script>

<template>
  <div>
    <component :is="layout" v-if="layout">
      <router-view></router-view>
    </component>
    <router-view v-else></router-view>
  </div>
</template>

<style scoped lang="scss">
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
