<script setup lang="ts">
import { fetchProposal } from '@/api'
import { defaultImage as vDefaultImage } from '@/directive/defaultImage'
import { toast } from '@/plugins'

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

const proposalList:any = ref([])

const query = ref({
  page: 1,
  pageSize: 12
})
const ProposalListTotal = ref(0)

function toProject (item:any) {
  // TODO: 確認使用 customizedUrl 、 id
  router.push({
    path: `/proposal/${item.customizedUrl}/dashboard`
  })
}
async function getProposalList() {
  const res = await fetchProposal.getList(query.value)
  if (res.status !== 'Success') return
  proposalList.value = res.data.list
  ProposalListTotal.value = res.data.totalCount
}

async function delProposal(id:string) {
  const query = { id: [id] }
  const res = await fetchProposal.delete(query)
  if (res.status !== 'Success') return
  toast.success('刪除募資提案成功!', {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000,
    theme: 'colored'
  })
  getProposalList()
}

watch(
  () => query.value.page,
  (newValue, oldValue) => {
    getProposalList()
  }
)

onMounted(() => {
  getProposalList()
})
</script>

<template>
  <section class="container m-auto">
    <!-- <ul class="flex">
      <li v-for="item in tabList" :key="item.value">
        <a
          @click.prevent="tabActive = item.value"
          :class="{'bg-brand-4 border-brand-2': tabActive === item.value }"
          class="flex items-center gap-x-3 border-b-4 border-#fff py-4 px-9 hover:bg-brand-4 hover:border-brand-2 cursor-pointer duration-300"
        >
          {{ item.title }}
        </a>
      </li>
    </ul> -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      <div  v-for="(item,index) in proposalList" :key="index" class="mb-4">
        <div class="flex flex-col w-full">
          <img v-default-image="'./proposal/proposalDefault.svg'" @click="toProject(item)" :src="item.image" class="cursor-pointer mb-2">
          <h5 class="text-h5 leading-h4">{{ item.name }}</h5>
          <div class="flex justify-between">
            <div>
              <p class="leading-h5">募資目標金額: {{ item.targetPrice }}</p>
              <p>當前累積金額: {{ item.nowPrice }}</p>
            </div>
            <div class="self-center">
              <button @click.prevent="delProposal(item.id)" class="bg-white b-#FF5D71 text-#FF5D71 hover:bg-#FF98A5 hover:b-#FF98A5 hover:text-white  b-2 duration-300 py-3 px-6 rounded-full">刪除募資提案</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex w-full items-center">
      <Pagination v-model="query.page" :page-size="query.pageSize" :total="ProposalListTotal" ></Pagination>
    </div>
  </section>
</template>
