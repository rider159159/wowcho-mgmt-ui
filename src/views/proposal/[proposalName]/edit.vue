<script setup lang="ts">
import { fetchProposal } from '@/api'
import { proposal } from '@/interface'
import { toast } from '@/plugins'
import { scrollToError, checkObjKey } from '@/composables'

const route = useRoute()
const router = useRouter()

const categoryList = ref([
  {
    title: '社會',
    value: 1
  },
  {
    title: '出版',
    value: 2
  },
  {
    title: '影音',
    value: 3
  },
  {
    title: '娛樂',
    value: 4
  },
  {
    title: '生活',
    value: 5
  },
  {
    title: '設計',
    value: 6
  },
  {
    title: '科技',
    value: 7
  },
  {
    title: '休閒',
    value: 8
  }
])

const ageLimitList = ref([
  {
    title: '無限制',
    value: 0
  },
  {
    title: '18 禁',
    value: 1
  }
])

const tempProposal = JSON.parse(JSON.stringify(proposal))
const formBody = ref(tempProposal)

// CK 編輯器用判斷是否獲得資料，以方便雙向綁定
const getCkData = ref(false)

async function getProposal () {
  const query = {
    proposalUrl: route.params.proposal
  }
  const res = await fetchProposal.get(query)
  if (res.status !== 'Success') return

  getCkData.value = true
  formBody.value = res.data
}

async function onSubmit() {
  // if (imageError()) return
  const formData = JSON.parse(JSON.stringify(formBody.value))
  const res = await fetchProposal.update(formData)
  if (res.status !== 'Success') return

  toast.success('編輯募資提案成功!', {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000,
    theme: 'colored'
  })
  setTimeout(() => {
    router.push({
      name: 'dashboard',
      params: {
        proposal: res.data.customizedUrl
      }
    })
  }, 2100)
}

function onInvalidSubmit({ errors }:any) {
  if (checkObjKey(errors).length > 0) {
    scrollToError()
  }
}

onMounted(() => {
  getProposal()
})
</script>

<template>
  <VForm @submit="onSubmit" @invalid-submit="onInvalidSubmit" v-slot="{ errors }" class="container mx-auto px-3 py-6">
    <h4 class="text-h2 leading-h2 mb-56px font-bold">修改募資提案</h4>
    <!-- 方案基本資訊 -->
    <h5 class="w-full text-brand1 text-h4 border-b-2 b-line pb-4 mb-6">募資商品基本資訊</h5>
    <MyLabel title="募資商品預覽圖" label="image" :require="true" class="mb-6"
      remark="請上傳小於 1MB 的圖片,建議尺寸為 1200 x 675 像素 (16:9),封面圖片可在專案上線前再另行編輯修改。"
      :class="{'errorMessage !mb-1':errors.image}"
      >
      <div class="flex flex-col items-start">
        <img v-if="formBody.image" :src="formBody.image" class=" max-h-500px w-auto mb-4">
        <CropperAndUpload  v-model="formBody.image" :error="errors.image ? true: false" class="self-start"></CropperAndUpload>
      </div>
    </MyLabel>
    <VField v-model="formBody.image" name="image" label="募資商品預覽圖" rules="required" class="hidden"></VField>
    <span class="block text-#FF5D71 mb-3 text-14px">{{ errors.image }}</span>

    <MyLabel title="募資商品預影片"  label="video" class="mb-6" remark="請附上影片，讓募資者能對更加了解">
      <input v-model="formBody.video" id="video" placeholder="募資商品影片" class="w-full h-48px text-h6 leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3" />
    </MyLabel>

    <MyLabel title="募資商品名稱" label="name" :require="true" class="mb-6" :class="{'errorMessage !mb-1':errors.name}">
      <VField v-model="formBody.name"  name="name" id="name" label="募資商品名稱" placeholder="募資商品名稱" rules="required"
        class="w-full h-48px text-h6 leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3"
        :class="{'!border-#FF5D71':errors.name}" />
    </MyLabel>
    <span v-if="errors.name" class="block text-#FF5D71 mb-3 text-14px">{{ errors.name }}</span>

    <MyLabel title="募資商品簡介" label="summary" :require="true" class="mb-6" :class="{'errorMessage !mb-1':errors.summary}" remark="簡介建議填寫該商品重點，折扣、金額、數量不建議在此填寫。" >
      <VField v-model="formBody.summary" as="textarea" type="textarea" name="summary" id="summary" label="募資商品簡介" placeholder="募資商品簡介" rules="required"
        class="w-full text-h6 h-120px leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3"
        :class="{'!border-#FF5D71':errors.summary}" >
      </VField>
    </MyLabel>

    <span v-if="errors.summary" class="block text-#FF5D71 mb-3 text-14px">{{ errors.summary }}</span>
    <MyLabel title="募資商品詳細介紹" label="description" :require="true" class="mb-6" :class="{'errorMessage !mb-1':errors.description}" remark="請告訴我們關於你計畫的故事、為什麼大家應該支持你的計畫。(最少 350 字，可使用 MarkDown 語法)">
      <VField v-model="formBody.description" name="description" id="description" label="募資商品詳細介紹" placeholder="募資商品簡介" rules="required"
        class="w-full text-h6 leading-h4 rounded-8px b-2px border-line focus:outline-none focus:border-brand3"
        >
        <Ckeditor v-model="formBody.description" :getCkData="getCkData"></Ckeditor>
      </VField>
    </MyLabel>
    <span v-if="errors.description" class="block text-#FF5D71 mb-3 text-14px">{{ errors.description }}</span>

    <!-- 募資目標與時程 -->
    <h5 class="w-full text-brand1 text-h4 border-b-2 b-line pb-4 mb-6 mt-56px">募資目標與時程</h5>
    <div class="mb-6">
      <MyLabel title="募資達標金額" label="targetPrice" :require="true" class="w-full xl:w-50%" :class="{'errorMessage !mb-1':errors.targetPrice}">
        <div class="flex items-center">
          <VField v-model="formBody.targetPrice" name="targetPrice" id="targetPrice" label="募資達標金額" rules="required|min_value:0|integer" type="number" placeholder="請根據你計畫的需求,估算你所需要募集的金額。"
            class="w-full h-48px text-h6 leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3 mr-3"
            :class="{'!border-#FF5D71':errors.targetPrice}" >
          </VField>
          <p class="text-gray2">NTD</p>
        </div>
      </MyLabel>
      <span v-if="errors.targetPrice" class="block text-#FF5D71 mb-3 text-14px">{{ errors.targetPrice }}</span>
    </div>

    <MyLabel title="募資活動時間" class="w-full">
      <div class="flex w-full xl:w-50%">
        <div class="w-50%"  :class="{'errorMessage':errors.startTime}">
          <VField v-model="formBody.startTime" name="startTime" id="startTime" label="提案開始時間" rules="required" type="number" placeholder="請根據你計畫的需求,估算你所需要募集的金額。">
            <VueDatePicker v-model="formBody.startTime" :disabled="true" :min-date="new Date()" :format="'yyyy/MM/dd HH:mm'" model-type="timestamp" locale="zh-TW" auto-apply>
              <template #dp-input="{ value }">
                <input :value="value" :disabled="true" type="text" placeholder="請選擇開始時間"
                  class="w-full h-48px text-h6 leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3 disabled:bg-gray-4"
                  :class="{'!border-#FF5D71':errors.startTim }">
              </template>
            </VueDatePicker>
          </VField>
          <span v-if="errors.startTime" class="block text-#FF5D71 mb-3 text-14px">{{ errors.startTime }}</span>
        </div>
        <p class="mt-14px mx-3">至</p>
        <div class="w-50%" :class="{'errorMessage':errors.endTime}">
          <VField v-model="formBody.endTime"  name="endTime" id="endTime" label="提案結束時間" rules="required" type="number" placeholder="請根據你計畫的需求,估算你所需要募集的金額。">
            <VueDatePicker v-model="formBody.endTime" :disabled="true" :min-date="new Date()" :format="'yyyy/MM/dd HH:mm'" model-type="timestamp" locale="zh-TW" auto-apply>
              <template #dp-input="{ value }">
                <input :value="value" type="text" placeholder="請選擇結束時間" :disabled="true"
                  class="w-full h-48px text-h6 leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3 disabled:bg-gray-4"
                  :class="{'!border-#FF5D71':errors.endTime}">
              </template>
            </VueDatePicker>
          </VField>
          <span v-if="errors.endTime" class="block text-#FF5D71 mb-3 text-14px">{{ errors.endTime }}</span>
        </div>
      </div>
    </MyLabel>

    <h5 class="w-full text-brand1 text-h4 border-b-2 b-line pb-4 mb-6 mt-56px">募資分類與網址</h5>
    <div class="flex w-full">
      <div class="w-[calc(50%-24px)] mr-6">
        <MyLabel title="募資商品分類" label="category" :require="true" class="mb-6" :class="{'errorMessage !mb-1':errors.category}">
          <VField v-model="formBody.category" as="select" name="category" id="category" label="商品分類"  rules="required"
            class="w-full h-48px text-h6 leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3"
            :class="{'!border-#FF5D71':errors.category}" >
            <option value="" class="text-#B0B1C8" disabled>請選擇商品分類</option>
            <option v-for="item in categoryList" :key="item.value" :value="item.value"> {{ item.title }}</option>

          </VField>
        </MyLabel>
        <span v-if="errors.category" class="block text-#FF5D71 mb-3 text-14px">{{ errors.category }}</span>
      </div>
      <div class="w-[calc(50%-24px)]">
        <MyLabel title="年齡限制" label="ageLimit" :require="true" class="mb-6" :class="{'errorMessage !mb-1':errors.ageLimit}">
          <VField v-model="formBody.ageLimit" as="select" name="ageLimit" id="ageLimit" label="商品分類"  rules="required"
            class="w-full h-48px text-h6 leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3"
            :class="{'!border-#FF5D71':errors.ageLimit}" >
            <option value="" disabled>請選擇年齡限制</option>
            <option v-for="item in ageLimitList" :key="item.value" :value="item.value"> {{ item.title }}</option>
          </VField>
        </MyLabel>
        <span v-if="errors.ageLimit" class="block text-#FF5D71 mb-3 text-14px">{{ errors.ageLimit }}</span>
      </div>
    </div>

    <MyLabel title="專案網址" label="customizedUrl" class="mb-6">
      <div class="flex items-center">
        <p class="mr-3">https://www.wowchao.com/#/project/</p>
        <input v-model="formBody.customizedUrl" :disabled="true" type="text" id="customizedUrl" class="w-full h-48px text-h6 leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3 disabled:bg-gray-4">
      </div>

    </MyLabel>

    <h5 class="w-full text-brand1 text-h4 border-b-2 b-line pb-4 mb-6 mt-56px">承諾及告示</h5>
    <MyLabel title="客服聯絡方式" class="mb-6" remark="1.建議包含客服信箱、連絡電話或 Line。 2. 接受 Markdown 語法。">
      <Markdown  v-model="formBody.contact" :getCkData="getCkData"></Markdown>
    </MyLabel>

    <MyLabel title="風險與挑戰" class="mb-6" remark="接受 Markdown 語法。">
      <Markdown  v-model="formBody.risk" :getCkData="getCkData"></Markdown>
    </MyLabel>

    <MyLabel title="退換貨方式" class="mb-6" remark="接受 Markdown 語法。">
      <Markdown  v-model="formBody.refund" :getCkData="getCkData"></Markdown>
    </MyLabel>

    <FooterProposal>
      <button type="submit" class="mt-4 lg:mt-0 px-6 py-3 bg-brand-1 hover:bg-brand-2 duration-300 text-white rounded-3xl">儲存提案</button>
    </FooterProposal>
  </VForm>
</template>
