<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div>
    <div>route params: <span class="fw-700 text-red"> {{ route.params.proposal }}</span></div>
    <p>查看募資提案上線進度與數據統計</p>
  </div>
</template>
