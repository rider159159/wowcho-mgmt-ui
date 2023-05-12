<script setup lang="ts">
import { fetchPlan } from '@/api'
import { toast } from '@/plugins'

const route = useRoute()

const query = ref({
  page: 1,
  pageSize: 12,
  proposalUrl: route.params.proposal
})

const planList:any = ref([])
const planListTotal = ref(0)

async function getPlanList() {
  const res = await fetchPlan.getList(query.value)
  if (res.status !== 'Success') return
  planList.value = res.data.list
  planListTotal.value = res.data.totalCount
}

async function delPlan(id:number) {
  const formBody = {
    id,
    proposalUrl: route.params.proposal
  }
  const res = await fetchPlan.delete(formBody)
  if (res.status !== 'Success') return
  toast.success('刪除募資方案成功', {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000,
    theme: 'colored'
  })
  getPlanList()
}

onMounted(() => {
  getPlanList()
})
</script>

<template>
  <div class="py-6">
    <h4 class="text-h2 leading-h2 mb-56px fw-700">計畫方案</h4>
    <!-- 方案基本資訊 -->
    <div class="flex border-b-2 b-line pb-4">
      <h5 class="w-full text-gray2 text-h5 self-center">可以在此頁面中設定，募資計畫中的商品方案。</h5>
      <router-link
        class="flex justify-center bg-brand-1 text-white hover:bg-brand-2 w-150px duration-300 py-2 rounded-3xl"
        :to="`/proposal/${route.params.proposal}/options/new`"
      >
        新增募資方案
      </router-link>
    </div>
    <!-- grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 -->
    <div>
      <div  v-for="(item,index) in planList" :key="index" class="mb-4">
        <div class="flex w-full py-4 gap-6">
          <img :src="item.image" class="w-[calc(25%-24px)]">
          <h5 class="w-[calc(45%-24px)] text-h6 leading-h5">{{ item.name }}</h5>
          <div class="w-[calc(30%-24px)]">
            <div class="w-full flex flex-col items-end gap-6">
              <p class="leading-h5">NT {{ item.actualPrice }}</p>
              <p> {{ item.nowBuyers }} / {{ item.quantity }}</p>
              <div class="flex">
                <router-link :to="`/proposal/${route.params.proposal}/options/${item.id}/edit`" class="text-brand2 b-2 b-brand2 hover:bg-brand-1 hover:b-brand-1 hover:text-white duration-300 rounded-8px cursor-pointer px-4 py-2 items-center mr-4">修改方案</router-link>
                <button @click="delPlan(item.id)" class="bg-white b-#FF5D71 text-#FF5D71 hover:bg-#FF98A5 hover:b-#FF98A5 hover:text-white b-2 duration-300 px-4 py-2 rounded-8px">刪除方案</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Pagination v-model="query.page" :page-size="query.pageSize" :total="planListTotal" ></Pagination>
    </div>
  </div>
</template>
