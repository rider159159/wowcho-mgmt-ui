<script lang="ts" setup>
const router = useRouter()
const projectsList = ref([
  {
    title: '日本BROSKI 防水真皮背包｜不怕淋雨高質感牛皮革、包身立體不變型【嘖嘖人氣好評贊助第二彈】',
    image: './test.webp',
    id: 'revopoint-range-1'
  },
  {
    title: '日本BROSKI 防水真皮背包｜不怕淋雨高質感牛皮革、包身立體不變型【嘖嘖人氣好評贊助第二彈】',
    image: './test.webp',
    id: 'revopoint-range-2'
  },
  {
    title: '日本BROSKI 防水真皮背包｜不怕淋雨高質感牛皮革、包身立體不變型【嘖嘖人氣好評贊助第二彈】',
    image: './test.webp',
    id: 'revopoint-range-3'
  }
])

function toProject (item:any) {
  router.push({
    name: 'projects',
    params: {
      id: item.id
    }
  })
}
</script>

<template>
  <div class="grid grid-cols-3 gap-4">
    <div @click="toProject(item)" v-for="(item,index) in projectsList" :key="index" class="rounded-xl cursor-pointer">
      <div class="flex flex-col w-full">
        <img :src="item.image" alt="">
        <p>{{ item.title }}</p>
      </div>
    </div>
  </div>
</template>
