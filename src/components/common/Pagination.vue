<script setup lang="ts">
import { Ref } from 'vue'

const props = defineProps({
  // 總數量
  total: {
    type: Number,
    require: true,
    default: 10
  },
  // 每頁顯示幾筆
  pageSize: {
    type: Number,
    require: true,
    default: 10
  },
  // 當前頁面
  modelValue: {
    type: Number,
    require: true,
    default: 1
  }
})
const emit = defineEmits(['update:modelValue'])

const total: Ref<number> = toRef(props, 'total')
const pageSize: Ref<number> = toRef(props, 'pageSize')
const currentPage: Ref<number> = toRef(props, 'modelValue')

const allPage = computed(() => Math.ceil(total.value / pageSize.value))

const clickFirst = () => {
  if (currentPage.value > 1) {
    handleChangePage(1)
  }
}
const clickPre = () => {
  if (currentPage.value > 1) {
    handleChangePage(currentPage.value - 1)
  }
}

const clickNext = () => {
  if (currentPage.value < allPage.value) {
    handleChangePage(currentPage.value + 1)
  }
}
const clickLast = () => {
  if (currentPage.value < allPage.value) {
    handleChangePage(allPage.value)
  }
}
function handleChangePage(value: number) {
  emit('update:modelValue', value)
}

watch([() => props.modelValue, () => props.total],
  ([newModelValue, oldModelValue], [newTotal, oldTotal]) => {})
</script>

<template>
<div class="flex w-full justify-center notranslate">
    <!-- 總頁數小於 5 頁，全部顯示 -->
    <div v-if="allPage <= 5" class="flex gap-2">
      <button @click.prevent="clickFirst" type="button" :disabled="currentPage === 1" class="w-32px h-32px cursor-pointer rounded-8px b-gray4 b duration-300 bg-white text-gray1 hover:bg-brand-2 hover:text-white">
        <span class="mdi mdi-page-first"></span>
      </button>
      <button @click.prevent="clickPre" type="button" :disabled="currentPage === 1" class="w-32px h-32px cursor-pointer rounded-8px b-gray4 b duration-300 bg-white text-gray1 hover:bg-brand-2 hover:text-white">
        <span class="mdi mdi-chevron-left"></span>
      </button>
      <button v-for="num in allPage" @click="handleChangePage(num)" :class="{'!bg-brand2 !text-white':  currentPage === num }" :key="num" type="button" class="w-32px h-32px cursor-pointer duration-300 rounded-8px b-gray4 b bg-white text-gray1 hover:bg-brand-2 hover:text-white"> {{ num }} </button>
      <!-- <button @click="clickNext" :disabled="currentPage === allPage" type="button" class="px-2 w-10 h-10 duration-300 border-brand1 text-brand1 hover:bg-brand1 hover:text-white disabled:border-[#979797] disabled:text-[#979797] disabled:bg-white border rounded-full ml-2 cursor-pointer">
        <span>下一頁</span>
      </button> -->
      <button @click.prevent="clickNext" type="button" :disabled="currentPage === allPage" class="w-32px h-32px cursor-pointer rounded-8px b-gray4 b duration-300 bg-white text-gray1 hover:bg-brand-2 hover:text-white">
        <span class="mdi mdi-chevron-right"></span>
      </button>
      <button @click.prevent="clickLast" type="button" :disabled="currentPage === allPage" class="w-32px h-32px cursor-pointer rounded-8px b-gray4 b duration-300 bg-white text-gray1 hover:bg-brand-2 hover:text-white">
        <span class="mdi mdi-page-last"></span>
      </button>
    </div>
    <!-- 大於 5 頁，根據當前頁數，顯示不同版型 -->
    <div v-else>
      <!-- 當前頁面 = 1 ~ 4-->
      <div v-if="currentPage >= 1 && currentPage < 4" class="flex gap-2">
        <button @click.prevent="clickFirst" type="button" :disabled="currentPage === 1" class="w-32px h-32px cursor-pointer rounded-8px b-gray4 b duration-300 bg-white text-gray1 hover:bg-brand-2 hover:text-white">
          <span class="mdi mdi-page-first"></span>
        </button>
        <button @click.prevent="clickPre" type="button" :disabled="currentPage === 1" class="w-32px h-32px cursor-pointer rounded-8px b-gray4 b duration-300 bg-white text-gray1 hover:bg-brand-2 hover:text-white">
          <span class="mdi mdi-chevron-left"></span>
        </button>
        <button v-for="num in 4" @click="handleChangePage(num)" :class="{'!bg-brand2 !text-white':  currentPage === num }" :key="num" type="button" class="w-32px h-32px cursor-pointer duration-300 rounded-8px b-gray4 b bg-white text-gray1 hover:bg-brand-2 hover:text-white">{{ num }}</button>
        <span>...</span>
        <button @click="clickLast" type="button" class="w-32px h-32px cursor-pointer duration-300 rounded-8px b-gray4 b bg-white text-gray1 hover:bg-brand-2 hover:text-white">{{ allPage }}</button>
        <button @click.prevent="clickNext" type="button" :disabled="currentPage === allPage" class="w-32px h-32px cursor-pointer rounded-8px b-gray4 b duration-300 bg-white text-gray1 hover:bg-brand-2 hover:text-white">
          <span class="mdi mdi-chevron-right"></span>
        </button>
        <button @click.prevent="clickLast" type="button" :disabled="currentPage === allPage" class="w-32px h-32px cursor-pointer rounded-8px b-gray4 b duration-300 bg-white text-gray1 hover:bg-brand-2 hover:text-white">
          <span class="mdi mdi-page-last"></span>
        </button>
      </div>
      <!-- 當前頁面 = 最後 4頁 ~ 最後一頁  -->
      <div v-else-if="currentPage <= allPage && currentPage >= allPage - 4" class="flex gap-2">
        <button @click.prevent="clickFirst" type="button" :disabled="currentPage === 1" class="w-32px h-32px cursor-pointer rounded-8px b-gray4 b duration-300 bg-white text-gray1 hover:bg-brand-2 hover:text-white">
          <span class="mdi mdi-page-first"></span>
        </button>
        <button @click.prevent="clickPre" type="button" :disabled="currentPage === 1" class="w-32px h-32px cursor-pointer rounded-8px b-gray4 b duration-300 bg-white text-gray1 hover:bg-brand-2 hover:text-white">
          <span class="mdi mdi-chevron-left"></span>
        </button>
        <button @click="clickFirst" type="button" class="w-32px h-32px cursor-pointer duration-300 rounded-8px b-gray4 b bg-white text-gray1 hover:bg-brand-2 hover:text-white">{{ 1 }}</button>
        <span>...</span>
        <button  v-for="num in [3,2,1,0]" @click="handleChangePage(allPage - num)" :class="{'!bg-brand2 !text-white':  currentPage === allPage - num }" :key="num" type="button" class="w-32px h-32px cursor-pointer duration-300 rounded-8px b-gray4 b bg-white text-gray1 hover:bg-brand-2 hover:text-white">{{ allPage - num }}</button>
        <button @click.prevent="clickNext" type="button" :disabled="currentPage === allPage" class="w-32px h-32px cursor-pointer rounded-8px b-gray4 b duration-300 bg-white text-gray1 hover:bg-brand-2 hover:text-white">
          <span class="mdi mdi-chevron-right"></span>
        </button>
        <button @click.prevent="clickLast" type="button" :disabled="currentPage === allPage" class="w-32px h-32px cursor-pointer rounded-8px b-gray4 b duration-300 bg-white text-gray1 hover:bg-brand-2 hover:text-white">
          <span class="mdi mdi-page-last"></span>
        </button>
      </div>
      <!-- 當前頁面 = 中間頁面 -->
      <div v-else class="flex gap-2">
        <button @click.prevent="clickFirst" type="button" :disabled="currentPage === 1" class="w-32px h-32px cursor-pointer rounded-8px b-gray4 b duration-300 bg-white text-gray1 hover:bg-brand-2 hover:text-white">
          <span class="mdi mdi-page-first"></span>
        </button>
        <button @click.prevent="clickPre" type="button" :disabled="currentPage === 1" class="w-32px h-32px cursor-pointer rounded-8px b-gray4 b duration-300 bg-white text-gray1 hover:bg-brand-2 hover:text-white">
          <span class="mdi mdi-chevron-left"></span>
        </button>
        <span>...</span>
        <button v-for="num in [-1,0,1]" :key="num" type="button" @click="handleChangePage( currentPage + num )" :class="{'!bg-brand2 !text-white': currentPage === currentPage + num }" class="w-32px h-32px cursor-pointer duration-300 rounded-8px b-gray4 b bg-white text-gray1 hover:bg-brand-2 hover:text-white">{{ currentPage + num }} </button>
        <span>...</span>
        <button @click.prevent="clickNext" type="button" :disabled="currentPage === allPage" class="w-32px h-32px cursor-pointer rounded-8px b-gray4 b duration-300 bg-white text-gray1 hover:bg-brand-2 hover:text-white">
          <span class="mdi mdi-chevron-right"></span>
        </button>
        <button @click.prevent="clickLast" type="button" :disabled="currentPage === allPage" class="w-32px h-32px cursor-pointer rounded-8px b-gray4 b duration-300 bg-white text-gray1 hover:bg-brand-2 hover:text-white">
          <span class="mdi mdi-page-last"></span>
        </button>
      </div>
    </div>
  </div>
</template>
