<script setup lang="ts">

</script>

<template>
  <div>
    <Header></Header>
    <main class="min-h-[calc(100vh-372px)] m-auto mt-18 px-3 py-6 md:w-4/5 md:max-w-324">
      <router-view></router-view>
    </main>
    <Footer />
  </div>
</template>
