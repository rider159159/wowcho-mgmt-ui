<script setup lang="ts">
import { E_ORDER_STATUS, ORDER_STATUS, E_SHIPPING_STATUS, SHIPPING_STATUS } from '@/interface'
import { dateTime, numberWithCommas } from '@/composables'

const router = useRouter()
const route = useRoute()

// console.log(router, route)

const data = {
  order: {
    title: '超早鳥 - 潮到出水短T',
    id: 'A000001',
    plan: '潮到出水短T套裝組',
    orderTime: 1684252837940,
    spec: ['XL', '粉'],
    freight: 20,
    totalAmount: 1500,
    payWay: '信用卡',
    orderStatus: 0,
    logistics: '超商取貨',
    shippingStatus: 0,
    note: 'test'
  },
  recipient: {
    name: '王小明',
    phone: '0911111111',
    info: {
      method: '郵局', // "7-11"
      shop: {
        name: '南港店',
        id: '001324'
      },
      trackingId: 'PP123124',
      address: '台北市台北區台北路1號'
    }
  },
  messages: [
    {
      id: '001',
      name: 'How 哥',
      role: 0,
      image: 'https://www...../face.png',
      content: '環保愛地球，這個募資活動推推！',
      createdAt: 213131223123,
      updatedAt: 213131223123
    }
  ]
}

function goProposal() {
  router.push({
    name: 'dashboard',
    params: { id: route.params.id }
  })
}
</script>

<template>
  <div class="flex flex-col px-3 lg:px-0 py-12 md:py-20 max-w-324 flex justify-center mx-auto">
    <div class="text-h3 leading-h3 md:(text-h2 leading-h2) text-gray-1 mb-8 md:mb-14">贊助詳情</div>
    <div class="flex flex-col md:flex-row gap-2 md:gap-4 lg:gap-8">
      <div class="flex justify-center items-center w-full border-gray-1 border-2 bg-gray-4">我是為了方案保留的區域</div>
      <div class="flex flex-col w-full">
        <div class="text-brand-1 text-h5 leading-h5 md:(text-h4 leading-h4) font-medium border-b-1 border-line py-4">訂單資訊</div>
        <div class="flex flex-col py-4 md:py-6 gap-2 md:gap-3">
          <div class="flex gap-4">
            <div class="text-gray-2">訂單編號</div>
            <div class="text-gray-1 font-medium">{{ data.order.id }}</div>
          </div>
          <div class="flex gap-4">
            <div class="text-gray-2">訂購時間</div>
            <div class="text-gray-1 font-medium">{{ dateTime(data.order.orderTime) }}</div>
          </div>
          <div class="flex gap-4">
            <div class="text-gray-2">專案</div>
            <div class="flex gap-2 text-brand-2 hover:text-brand-1 font-medium cursor-pointer" @click="goProposal()">
              <div>{{ data.order.title }}</div>
              <div class="mdi mdi-open-in-new"></div>
            </div>
          </div>
          <div class="flex gap-4">
            <div class="text-gray-2">方案</div>
            <div class="text-gray-1 font-medium">{{ data.order.spec.join('、') }}</div>
          </div>
          <div class="flex gap-4">
            <div class="text-gray-2">總金額</div>
            <div class="text-gray-1 font-medium">NT$ {{ numberWithCommas(data.order.totalAmount) }}</div>
          </div>
          <div class="flex gap-4">
            <div class="text-gray-2">運費</div>
            <div class="text-gray-1 font-medium">NT$ {{ numberWithCommas(data.order.freight) }}</div>
          </div>
          <div class="flex gap-4">
            <div class="text-gray-2">付款方式</div>
            <div class="text-gray-1 font-medium">{{ data.order.payWay }}</div>
          </div>
          <div class="flex gap-4">
            <div class="text-gray-2">訂單狀態</div>
            <div class="font-medium" :class="!(data.order.orderStatus === E_ORDER_STATUS.CANCELED) ? 'text-green' : 'text-red'">{{ ORDER_STATUS[data.order.orderStatus] }}</div>
          </div>
          <div class="flex gap-4">
            <div class="text-gray-2">物流方式</div>
            <div class="text-gray-1 font-medium">{{ data.order.logistics }}</div>
          </div>
          <div class="flex gap-4">
            <div class="text-gray-2">出貨狀態</div>
            <div class="font-medium" :class="data.order.shippingStatus === E_SHIPPING_STATUS.SHIPPED ? 'text-green' : 'text-red'">{{ SHIPPING_STATUS[data.order.shippingStatus] }}</div>
          </div>
        </div>
      </div>
      <div class="flex flex-col w-full">
        <div class="text-brand-1 text-h5 leading-h5 md:(text-h4 leading-h4) font-medium border-b-1 border-line py-4">收件者資訊</div>
        <div class="flex flex-col py-4 md:py-6 gap-2 md:gap-3">
          <div class="flex gap-4">
            <div class="text-gray-2">姓名</div>
            <div class="text-gray-1 font-medium">{{ data.recipient.name }}</div>
          </div>
          <div class="flex gap-4">
            <div class="text-gray-2">電話</div>
            <div class="text-gray-1 font-medium">{{ data.recipient.phone }}</div>
          </div>
          <div class="flex gap-4">
            <div class="text-gray-2">取件方式</div>
            <div class="text-gray-1 font-medium">{{ data.recipient.info.method }}</div>
          </div>
          <div class="flex gap-4">
            <div class="text-gray-2">取貨地點</div>
            <div class="text-gray-1 font-medium">{{ data.recipient.info.shop.name }}</div>
          </div>
          <div class="flex gap-4">
            <div class="text-gray-2">物流寄件編號</div>
            <div class="text-gray-1 font-medium">{{ data.recipient.info.trackingId }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
