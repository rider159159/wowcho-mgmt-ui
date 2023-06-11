<script setup lang="ts">
import { dateYYYYMMDD } from '@/composables'
import { fetchFaq } from '@/api'
import { toast } from '@/plugins'

interface IFaq {
  id:string,
  title: string,
  content: string
  updatedAt: string,
}
interface IFaqList {
  list:Array<IFaq>,
    totalCount:number
}

const route = useRoute()
const data:Ref<IFaqList> = ref({
  list: [],
  totalCount: 0
})
const formQuery = ref({
  page: 1,
  pageSize: 10,
  customizedUrl: route.params.proposal
})

async function delFaq(id:string) {
  const formBody = {
    id,
    customizedUrl: route.params.proposal
  }
  const res = await fetchFaq.delete(formBody)
  if (res.status !== 'Success') return
  toast.success('刪除常見問答成功', {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000,
    theme: 'colored'
  })
  getFaq()
}

async function getFaq() {
  const res = await fetchFaq.getList(formQuery.value)
  if (res.status !== 'Success') return
  data.value = res.data
}

onMounted(() => {
  getFaq()
})
</script>

<template>
  <section class="py-6">
    <div class="text-h2 leading-h2 mb-56px fw-700">問答列表</div>
    <div class="md:(max-w-324 mx-auto) flex flex-col justify-center">
      <div class="w-full flex justify-end mb-10">
        <RouterLink :to="`/proposal/${route.params.proposal}/faqs/new`" class="flex justify-center bg-brand-1 text-white hover:bg-brand-2 duration-300 py-2 px-4 rounded-3xl">新增常見問答</RouterLink>
      </div>
      <div class="mb-8 w-full overflow-x-auto ">
        <table class="w-full">
          <thead class="h-50px w-full bg-gray-4 rounded-lg text-gray-2 font-medium">
            <th>常見問答標題</th>
            <!-- <th>內容</th> -->
            <th>編輯日期</th>
            <th>操作</th>
          </thead>
          <tbody v-if="data.list.length > 0">
            <tr v-for="faq in data.list" :key="faq.id" class="cursor-pointer text-gray-1 rounded-l-lg duration-300 hover:bg-brand-4 text-center">
              <td>{{ faq.title }}</td>
              <!-- <td class="max-w-40%">
                <div v-html="faq.content" class="overflow-ellipsis w-full">
                </div>
              </td> -->
              <td>{{ dateYYYYMMDD(faq.updatedAt) }}</td>
              <td>
                <div class="flex justify-center items-center py-2">
                  <RouterLink :to="`/proposal/${route.params.proposal}/faqs/${faq.id}/edit`" class="text-brand2 b-2 b-brand2 hover:bg-brand-1 hover:b-brand-1 hover:text-white duration-300 rounded-8px cursor-pointer px-4 py-2 items-center mr-4">編輯</RouterLink>
                  <button @click="delFaq(faq.id)" type="button" class="bg-white b-#FF5D71 text-#FF5D71 hover:bg-#FF98A5 hover:b-#FF98A5 hover:text-white b-2 duration-300 px-4 py-2 rounded-8px">刪除</button>
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

// .overflow-ellipsis::after {
//     content: "...";
//     position: absolute;
//     bottom: 0;
//     right: 0;
//     padding: 0 10px 10px 45px;
//     background: inherit;
// }
</style>
