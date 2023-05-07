<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div>
    <div>route params:
      <span class="fw-700 text-red"> {{ route.params.proposal }} 、</span>
      <span class="fw-700 text-red"> {{ route.params.optionId }}</span>
    </div>
    <p>編輯募資方案</p>
  </div>
</template>
