<script setup lang="ts">
import { fetchUpload } from '@/api'
const showErrorMessage = ref(false)
const props = defineProps({
  modelValue: {
    type: String,
    default: () => ''
  },
  limit: {
    type: Number,
    default: 5242880
  },
  errorMessage: {
    type: String,
    default: '檔案不可大於 5 Mb'
  },
  labelTitle: {
    type: String,
    default: '上傳圖片'
  },
  class: {
    type: String,
    default: ''
  }
})
// const { modelValue } = toRefs(props)
const emits = defineEmits(['update:modelValue'])

async function uploadImage(files:any) : Promise<void> {
  const { data, status } = await fetchUpload.upload(files)
  if (status !== 'Success') return

  // uploadInputRef.value.value = '';
  emits('update:modelValue', data.imgUrl)
}
function checkImage(e:any) {
  const files = e.target.files
  const file = files[0]
  const formData = new FormData()
  formData.append('file', file)
  // 有上傳圖片
  if (files.length > 0) {
    // props 限制大於 0 有限制，若等於 0 無限制
    if (props.limit > 0) {
      // 上傳限制 > 外層傳來限制，不打上傳 API
      if (file.size > props.limit) {
        showErrorMessage.value = true
        return
      }
      showErrorMessage.value = false
      uploadImage(formData)
    } else {
      uploadImage(formData)
    }
  }
}

</script>

<template>
  <div class="w-full flex justify-center">
    <label for="uploadInput" class="inline-block cursor-pointer min-w-200px lg:w-full" :class="props.class">
      <!-- <img class="w-full" src="/proposal/Upload.svg"> -->
      <div class="flex flex-col items-center max-w-320px b-#DFEAF4 b-dotted b-2 w-full py-16">
        <img src="/CloudUploplad.svg">
        <p v-if="modelValue === ''" class="text-gray-2">{{ props.labelTitle }}</p>
        <p v-else class="text-gray-2">重新上傳圖片</p>
      </div>
    </label>
    <input @change="checkImage" accept=".jpg, .png, .jpeg .webp" type="file" id="uploadInput" class="hidden">
    <span v-if="showErrorMessage">{{ props.errorMessage }}</span>
  </div>
</template>
