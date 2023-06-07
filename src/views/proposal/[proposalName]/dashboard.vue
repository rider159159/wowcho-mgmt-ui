<script setup lang="ts">
import { fetchDashboard } from '@/api'
import { numberWithCommas, dateYYYYMMDD, formatRemainingTime } from '@/composables'
const route = useRoute()

const dashboard:any = ref({
  proposal: {}
})
async function getDashboard() {
  const query = {
    customizedUrl: route.params.proposal
  }
  const res = await fetchDashboard.get(query)
  if (res.status !== 'Success') return
  dashboard.value = res.data
}

onMounted(() => {
  getDashboard()
})
</script>

<template>
  <div class="flex flex-col px-3 lg:px-0 py-12 max-w-324 flex justify-center mx-auto gap-8">
    <!-- <div class="text-h3 leading-h3 mb-4 md:(text-h2 leading-h2 mb-6) text-gray-1">控制中心</div> -->
    <div class="flex flex-col lg:flex-row justify-around gap-4 lg:gap-2 items-start lg:items-center p-6 md:p-10 border-brand-3 border-3 w-full">
      <div class="flex gap-3 items-center">
        <div class="rounded-25px bg-brand-3 min-w-10 min-h-10 flex justify-center items-center">
          <div class="w-8 h-8 mdi mdi-check-bold flex justify-center items-center text-white"></div>
        </div>
        <div class="flex flex-col gap-1">
          <div class="text-brand-1 text-h5 leading-h5 md:(text-h4 leading-h4)">提案審核</div>
        </div>
      </div>
      <div class="flex gap-3 items-center">
        <!-- <div  class="rounded-25px border-brand-3 border-2 text-brand-3 min-w-10 min-h-10 flex justify-center items-center">
          <div class="w-8 h-8 flex justify-center items-center font-bold">02</div>
        </div> -->
        <div class="rounded-25px bg-brand-3 min-w-10 min-h-10 flex justify-center items-center">
          <div class="w-8 h-8 mdi mdi-check-bold flex justify-center items-center text-white"></div>
        </div>
        <div class="flex flex-col gap-1">
          <div class="text-brand-1 text-h5 leading-h5 md:(text-h4 leading-h4)">商業檔案</div>
          <div class="text-gray-2 text-h6 leading-h6 md:(text-h5 leading-h5)">聯絡資料與帳戶資訊</div>
        </div>
      </div>
      <div class="flex gap-3 items-center">
        <div v-if="dashboard.dashboardStatus === 2" class="rounded-25px border-brand-3 border-2 text-brand-3 min-w-10 min-h-10 flex justify-center items-center">
          <div class="w-8 h-8 flex justify-center items-center font-bold">03</div>
        </div>
        <div v-else class="rounded-25px bg-brand-3 min-w-10 min-h-10 flex justify-center items-center">
          <div class="w-8 h-8 mdi mdi-check-bold flex justify-center items-center text-white"></div>
        </div>
        <div class="flex flex-col gap-1">
          <div class="text-brand-1 text-h5 leading-h5 md:(text-h4 leading-h4)">計畫方案</div>
          <div class="text-gray-2 text-h6 leading-h6 md:(text-h5 leading-h5)">專案方案價格</div>
        </div>
      </div>
      <!-- <div class="flex gap-3 items-center">
        <div class="rounded-25px border-brand-3 border-2 text-brand-3 min-w-10 min-h-10 flex justify-center items-center">
          <div class="w-8 h-8 flex justify-center items-center font-bold">04</div>
        </div>
        <div class="flex flex-col gap-1">
          <div class="text-brand-1 text-h5 leading-h5 md:(text-h4 leading-h4)">金流申請</div>
          <div class="text-gray-2 text-h6 leading-h6 md:(text-h5 leading-h5)">申請所需收款管道</div>
        </div>
      </div> -->
      <div class="flex gap-3 items-center">
        <div v-if="dashboard.dashboardStatus === 2" class="rounded-25px border-brand-3 border-2 text-brand-3 min-w-10 min-h-10 flex justify-center items-center">
          <div class="w-8 h-8 flex justify-center items-center font-bold">04</div>
        </div>
        <div v-else class="rounded-25px bg-brand-3 min-w-10 min-h-10 flex justify-center items-center">
          <div class="w-8 h-8 mdi mdi-check-bold flex justify-center items-center text-white"></div>
        </div>
        <div class="flex flex-col gap-1">
          <div class="text-brand-1 text-h5 leading-h5 md:(text-h4 leading-h4)">準備上線</div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="flex flex-col items-end gap-3 p-6 md:p-10 border-brand-3 hover:bg-brand-4 border-3 w-full transition-all tansition-duration-500">
        <div class="text-h6 leading-h6 md:(text-h5 leading-h5) text-gray-2 font-medium">專案結束倒數</div>
        <div class="text-h2 leading-h2 md:(text-h3 leading-h3) text-gray-1 font-bold">{{ formatRemainingTime(dashboard.endTime) }} 天</div>
        <div class="text-h6 leading-h6 text-gray-2">{{ `${dateYYYYMMDD(dashboard.startTime)} - ${dateYYYYMMDD(dashboard.endTime)}` }}</div>
      </div>
      <div class="flex flex-col items-end gap-3 p-6 md:p-10 border-brand-3 hover:bg-brand-4 border-3 w-full transition-all tansition-duration-500">
        <div class="text-h6 leading-h6 md:(text-h5 leading-h5) text-gray-2 font-medium">累積贊助總額</div>
        <div class="text-h2 leading-h2 md:(text-h3 leading-h3) text-gray-1 font-bold">NT$ {{ numberWithCommas(dashboard.nowPrice) }} </div>
        <div class="text-h6 leading-h6 text-gray-2">目標 NT$ {{ numberWithCommas(dashboard.targetPrice) }} </div>
      </div>
      <div class="flex flex-col items-end gap-3 p-6 md:p-10 border-brand-3 hover:bg-brand-4 border-3 w-full transition-all tansition-duration-500">
        <div class="text-h6 leading-h6 md:(text-h5 leading-h5) text-gray-2 font-medium">累積訂單數</div>
        <div class="text-h2 leading-h2 md:(text-h3 leading-h3) text-gray-1 font-bold">{{ dashboard.orderCount }}</div>
      </div>
      <!-- <div class="flex flex-col items-end gap-3 p-6 md:p-10 border-brand-3 hover:bg-brand-4 border-3 w-full transition-all tansition-duration-500">
        <div class="text-h6 leading-h6 md:(text-h5 leading-h5) text-gray-2 font-medium">平均贊助金額</div>
        <div class="text-h2 leading-h2 md:(text-h3 leading-h3) text-gray-1 font-bold">NT$ 2,123</div>
      </div>
      <div class="flex flex-col items-end gap-3 p-6 md:p-10 border-brand-3 hover:bg-brand-4 border-3 w-full transition-all tansition-duration-500">
        <div class="text-h6 leading-h6 md:(text-h5 leading-h5) text-gray-2 font-medium">加碼總額</div>
        <div class="text-h2 leading-h2 md:(text-h3 leading-h3) text-gray-1 font-bold">NT$ 23,423</div>
      </div>
      <div class="flex flex-col items-end gap-3 p-6 md:p-10 border-brand-3 hover:bg-brand-4 border-3 w-full transition-all tansition-duration-500">
        <div class="text-h6 leading-h6 md:(text-h5 leading-h5) text-gray-2 font-medium">累積退款總額</div>
        <div class="text-h2 leading-h2 md:(text-h3 leading-h3) text-gray-1 font-bold">NT$ 4,657</div>
      </div> -->
    </div>
  </div>
</template>
