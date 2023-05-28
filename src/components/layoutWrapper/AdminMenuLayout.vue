<script setup lang="ts">
</script>

<template>
  <div>
    <Header></Header>
    <main class="mt-80px min-h-[calc(100vh-380px)]">
      <div class=" m-auto gap-10 flex justify-between items-start">
        <AdminMenu active="dashboard" />
        <div class="w-[calc(100vw-18rem)]">
          <router-view></router-view>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>
