<script setup lang="ts">
const router = useRouter()
const tabList = ref([
  {
    title: '集資中',
    value: 0
  },
  {
    title: '集資尚未開始',
    value: 1
  },
  {
    title: '集資結束',
    value: 2
  }
])
const tabActive = ref(0)

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
    path: `/proposal/${item.id}/dashboard`
    // params: {
    //   id: item.id
    // }
  })
}
</script>

<template>
  <section class="container m-auto">
    <ul class="flex">
      <li v-for="item in tabList" :key="item.value">
        <a
          @click.prevent="tabActive = item.value"
          :class="{'bg-brand-4 border-brand-2': tabActive === item.value }"
          class="flex items-center gap-x-3 border-b-4 border-#fff py-4 px-9 hover:bg-brand-4 hover:border-brand-2 cursor-pointer duration-300"
        >
          {{ item.title }}
        </a>
      </li>
    </ul>
    <div class="grid grid-cols-3 gap-4">
    <div @click="toProject(item)" v-for="(item,index) in projectsList" :key="index" class="rounded-xl cursor-pointer">
      <div class="flex flex-col w-full">
        <img :src="item.image" alt="">
        <p>{{ item.title }}</p>
      </div>
    </div>
  </div>
  </section>
</template>
