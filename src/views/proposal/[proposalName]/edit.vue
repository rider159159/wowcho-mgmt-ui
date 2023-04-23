<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div>
    <div>route params: <span class="fw-700 text-red"> {{ route.params.proposal }}</span></div>
    <p>修改提案計畫</p>
  </div>
</template>
