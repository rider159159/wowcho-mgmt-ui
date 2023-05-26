<script setup lang="ts">
import { E_ORDER_STATUS, E_SHIPPING_STATUS, ISponsor, ORDER_STATUS, SHIPPING_STATUS } from '@/interface'
import { dateYYYYMMDD, numberWithCommas } from '@/composables'

const router = useRouter()

const list: ISponsor[] = []

for (let i = 1; i <= 10; i++) {
  const data: ISponsor = {
    id: `ID_${i}`,
    title: `Sponsor ${i}`,
    plan: `Plan ${i}`,
    spec: `Spec ${i}`,
    totalAmount: `NT$${numberWithCommas(i * 1000)}`,
    orderTime: Date.now(), // Use appropriate timestamp value here
    orderStatus: i % 3 === 0 ? E_ORDER_STATUS.CANCELED : i % 3 === 1 ? E_ORDER_STATUS.SUCCESS : E_ORDER_STATUS.PAID, // Example alternating order status
    shippingStatus: i % 2 === 0 ? E_SHIPPING_STATUS.NOT_SHIPPED : E_SHIPPING_STATUS.SHIPPED // Example alternating shipping status
  }

  list.push(data)
}

function goDetail(id: string) {
  // console.log(id)
  router.push({
    name: 'backersDetail',
    params: { id }
  })
}
</script>

<template>
  <div class="md:(max-w-324 mx-auto) flex flex-col justify-center py-20">
    <div class="mx-3 mb-8 w-full overflow-x-scroll lg:overflow-hidden">
      <table class="min-w-324">
        <thead class="h-50px bg-gray-4 rounded-lg text-gray-2 font-medium">
          <th class="rounded-l-lg">訂單編號</th>
          <th>購買日期</th>
          <th>贊助專案</th>
          <th>方案</th>
          <th>金額</th>
          <th>訂單狀態</th>
          <th>出貨狀態</th>
          <th class="rounded-r-lg">詳細</th>
        </thead>
        <tbody>
          <tr v-for="sponsor in list" :key="sponsor.id" class="cursor-pointer text-gray-1 rounded-l-lg transition-all transition-duraiotn-500 hover:bg-brand-4 text-center">
            <td>{{ sponsor.id }}</td>
            <td>{{ dateYYYYMMDD(sponsor.orderTime) }}</td>
            <td>{{ sponsor.title }}</td>
            <td>{{ sponsor.plan }}</td>
            <td>{{ sponsor.totalAmount }}</td>
            <td :class="!(sponsor.orderStatus === E_ORDER_STATUS.CANCELED) ? 'text-green' : 'text-red'">{{ ORDER_STATUS[sponsor.orderStatus] }}</td>
            <td :class="sponsor.shippingStatus === E_SHIPPING_STATUS.SHIPPED ? 'text-green' : 'text-red'">{{ SHIPPING_STATUS[sponsor.shippingStatus] }}</td>
            <td class="flex justify-center items-center text-brand-2 hover:text-brand-1 transition transition-all transition-duration-500 rounded-r-lg" @click="goDetail(sponsor.id)">
              <div>詳情</div>
              <div class="mdi mdi-chevron-right w-6 h-6"></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination />
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
