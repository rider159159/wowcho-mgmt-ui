<script setup lang="ts">
import { fetchUpload } from '@/api'
const showErrorMessage = ref(false)
const props = defineProps({
  modelValue: {
    type: String,
    default: () => ''
  },
  // 上傳檔案大小預設 5Mb
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
    default: '選擇上傳圖片'
  },
  class: {
    type: String,
    default: ''
  },
  fixedNumber: {
    type: Array,
    default: () => [16, 9]
  },
  error: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['update:modelValue'])
// files:any
const cropper = ref()

const option = computed(() => {
  const options = {
    fixedNumber: props.fixedNumber,
    autoCrop: true,
    fixed: true,
    mode: 'cover'
  }
  return options
})

const currentImg = ref('')
const showCropper = ref(false)

function choseImage(e:any) {
  const files = e.target.files
  const file = files[0]
  // 有上傳圖片
  if (files.length > 0) {
    // props 限制大於 0 有限制，若等於 0 無限制
    if (props.limit > 0) {
      // 上傳限制 > 外層傳來限制，不打上傳 API
      if (file.size > props.limit) {
        showErrorMessage.value = true
        return
      }
      showCropperImage(file)
    } else {
      showCropperImage(file)
    }
  }
}

function showCropperImage(file:any) {
  const fileReader = new FileReader()
  showErrorMessage.value = false
  showCropper.value = true
  // 將檔案轉成 Base 64
  fileReader.readAsDataURL(file)
  fileReader.onload = () => {
    if (typeof fileReader.result === 'string') {
      currentImg.value = fileReader.result
    }
  }
}

async function checkUpload() : Promise<void> {
  cropper.value.getCropBlob((data:any) => {
    if (data) {
      uploadImage(data)
    }
  })
}

async function uploadImage(files:any) : Promise<void> {
  const formData = new FormData()
  formData.append('file', files, 'filename.jpeg')
  const { data, status } = await fetchUpload.upload(formData)
  if (status !== 'Success') return

  emits('update:modelValue', data.imgUrl)
  showCropper.value = false
}
</script>

<template>
  <div class="w-full flex flex-col lg:flex-row justify-start">
    <label for="uploadInput" class="inline-block cursor-pointer min-w-200px md:min-w-350px lg:w-auto" :class="props.class">
      <!-- <img class="w-full" src="/proposal/Upload.svg"> -->

      <div class="flex flex-col items-center max-w-320px b-#DFEAF4 b-dotted b-2 w-full py-16" :class="{ 'b-#FF5D71':props.error}">
        <img src="/CloudUploplad.svg">
        <p v-if="modelValue === ''" class="text-gray-2">{{ props.labelTitle }}</p>
        <p v-else class="text-gray-2">重新上傳圖片</p>
      </div>
    </label>
    <input @change="choseImage" accept=".jpg, .png, .jpeg .webp" type="file" id="uploadInput" class="hidden">
    <div v-if="showCropper" class="w-full">
      <div class="h-500px">
        <VueCropper
          ref="cropper"
          :img="currentImg"
          v-bind="option">
        </VueCropper>
      </div>
      <button @click="checkUpload" type="button" class="mt-4 w-full lg:w-auto lg:px-6 py-2 bg-brand-1 hover:bg-brand-2 duration-300 text-white rounded-3xl">確定上傳</button>
    </div>

    <span v-if="showErrorMessage" class="block self-end text-#FF5D71 mb-3 text-14px">{{ props.errorMessage }}</span>
  </div>
</template>
