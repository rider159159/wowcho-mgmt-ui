<script setup lang="ts">
import { dateYYYYMMDD } from '@/composables'
import { fetchSponsor } from '@/api'
import { SponsorList } from '@/interface'

const router = useRouter()
const route = useRoute()

const data = ref({
  list: { ...SponsorList },
  totalCount: 0
})

function goDetail(id: string) {
  router.push({
    name: 'backersDetail',
    params: { id }
  })
}

const formQuery = ref({
  page: 1,
  pageSize: 10,
  customizedUrl: route.params.proposal
})

async function getSponsorList () {
  const res = await fetchSponsor.getList(formQuery.value)
  if (res.status !== 'Success') return
  data.value = res.data
}

watch(
  () => formQuery.value.page,
  () => getSponsorList()
)

onMounted(() => {
  getSponsorList()
})
</script>

<template>
  <div class="md:(max-w-324 mx-auto) flex flex-col justify-center py-20">
    <div class="mb-8 w-full overflow-x-auto ">
      <table class="min-w-324">
        <thead class="h-50px bg-gray-4 rounded-lg text-gray-2 font-medium">
          <th class="rounded-l-lg">訂單編號</th>
          <th>購買日期</th>
          <th>贊助專案</th>
          <th>選擇規格</th>
          <th>金額</th>
          <th>購買人名稱</th>
          <th class="rounded-r-lg">詳細</th>
        </thead>
        <tbody>
          <tr v-for="sponsor in data.list" :key="sponsor.id" class="cursor-pointer text-gray-1 rounded-l-lg transition-all transition-duraiotn-500 hover:bg-brand-4 text-center">
            <td>{{ sponsor.MerchantOrderNo }}</td>
            <td>{{ dateYYYYMMDD(sponsor.updatedAt) }}</td>
            <td>{{  sponsor.proposalId.name }}</td>
            <td>{{ sponsor.option.join('、') }}</td>
            <td>{{ sponsor.planId.actualPrice }}</td>
            <td>{{ sponsor.CVSCOMName }}</td>
            <td class="flex justify-center items-center text-brand-2 hover:text-brand-1 transition transition-all transition-duration-500 rounded-r-lg" @click="goDetail(sponsor.id)">
              <div>詳情</div>
              <div class="mdi mdi-chevron-right w-6 h-6"></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination
      v-if="data.totalCount > 0"
      v-model="formQuery.page"
      :page-size="formQuery.pageSize"
      :total="data.totalCount"
    />
  </div>
</template>

<style lang="scss" scoped>
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
