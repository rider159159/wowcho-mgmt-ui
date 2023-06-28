<script setup lang="ts">
import { dateYYYYMMDD } from '@/composables'
import { fetchPlacard } from '@/api'
import { toast } from '@/plugins'

interface IPlacard {
  id:string,
  title: string,
  content: string
  updatedAt: string,
}
interface IPlacardList {
  list:Array<IPlacard>,
    totalCount:number
}

const route = useRoute()
const data:Ref<IPlacardList> = ref({
  list: [],
  totalCount: 0
})
const formQuery = ref({
  page: 1,
  pageSize: 10,
  customizedUrl: route.params.proposal
})

async function delPlacard(id:string) {
  const formBody = {
    id,
    customizedUrl: route.params.proposal
  }
  const res = await fetchPlacard.delete(formBody)
  if (res.status !== 'Success') return
  toast.success('刪除募資公告成功', {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000,
    theme: 'colored'
  })
  getPlacard()
}

async function getPlacard() {
  const res = await fetchPlacard.getList(formQuery.value)
  if (res.status !== 'Success') return
  data.value = res.data
}

onMounted(() => {
  getPlacard()
})
</script>

<template>
  <section class="py-6">
    <div class="text-h2 leading-h2 mb-56px fw-700">公告列表</div>
    <div class="md:(max-w-324 mx-auto) flex flex-col justify-center">
      <div class="w-full flex justify-end mb-10">
        <RouterLink :to="`/proposal/${route.params.proposal}/announce/new`" class="flex justify-center bg-brand-1 text-white hover:bg-brand-2 duration-300 py-2 px-4 rounded-3xl">新增公告</RouterLink>
      </div>
      <div class="mb-8 w-full overflow-x-auto ">
        <table class="w-full">
          <thead class="h-50px w-full bg-gray-4 rounded-lg text-gray-2 font-medium">
            <th>公告標題</th>
            <!-- <th>內容</th> -->
            <th>編輯日期</th>
            <th>操作</th>
          </thead>
          <tbody v-if="data.list.length > 0">
            <tr v-for="item in data.list" :key="item.id" class="cursor-pointer text-gray-1 rounded-l-lg duration-300 hover:bg-brand-4 text-center">
              <td>{{ item.title }}</td>
              <td>{{ dateYYYYMMDD(item.updatedAt) }}</td>
              <td>
                <div class="flex justify-center items-center py-2">
                  <RouterLink :to="`/proposal/${route.params.proposal}/announce/${item.id}/edit`" class="text-brand2 b-2 b-brand2 hover:bg-brand-1 hover:b-brand-1 hover:text-white duration-300 rounded-8px cursor-pointer px-4 py-2 items-center mr-4" >編輯</RouterLink>
                  <button @click="delPlacard(item.id)" type="button" class="bg-white b-#FF5D71 text-#FF5D71 hover:bg-#FF98A5 hover:b-#FF98A5 hover:text-white b-2 duration-300 px-4 py-2 rounded-8px">刪除</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="data.list.length === 0" class="flex justify-center py-4 w-full text-gray-2 font-medium font-bold">目前無資料</div>
      </div>
      <Pagination
        v-if="data.totalCount > 0"
        v-model="formQuery.page"
        :page-size="formQuery.pageSize"
        :total="data.totalCount"
      />
    </div>
    <FooterProposal></FooterProposal>
  </section>
</template>

<style lang="scss" scoped>
.overflow-ellipsis {
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 控制行數 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  max-width: 100px; /* 定義你想要的最大寬度 */
  max-height: 100px; /* 定義你想要的最大高度 */

}

table {
  th, td {
    @apply p-4 min-w-25 text-center;
  }
  th {
    @apply h-50px;
  }
  tr {
    &:not(:first-child) {
      @apply border-t-1 border-line;
    }
  }
  td {
    @apply h-14;
  }
}
</style>
