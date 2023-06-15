<script setup lang="ts">
</script>

<template>
  <div>
    <Header></Header>
    <main class="mt-80px min-h-[calc(100vh-380px)]">
      <div class=" m-auto gap-10 flex justify-between items-start">
        <AdminMenu/>
        <div class="w-full lg:w-[calc(100vw-18rem)] px-3">
          <router-view></router-view>
        </div>
      </div>
    </main>
    <Footer class="pb-130px lg:pb-80px" />
  </div>
</template>
