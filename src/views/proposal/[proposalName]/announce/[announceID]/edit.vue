<script setup lang="ts">
import { fetchPlacard } from '@/api'
import { toast } from '@/plugins'
const router = useRouter()
const route = useRoute()
const formBody:any = ref({})

async function submitForm() {
  const formData = JSON.parse(JSON.stringify(formBody.value))
  formData.customizedUrl = route.params.proposal
  const res = await fetchPlacard.update(formData)
  if (res.status !== 'Success') return

  toast.success('編輯公告成功', {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000,
    theme: 'colored'
  })
  setTimeout(() => {
    router.push({
      name: 'announce',
      params: {
        proposal: res.data.customizedUrl
      }
    })
  }, 2100)
}

// CK 編輯器用判斷是否獲得資料，以方便雙向綁定
const getCkData = ref(false)

async function getFaq() {
  const query = {
    customizedUrl: route.params.proposal,
    id: route.params.announceId
  }
  const res = await fetchPlacard.get(query)
  if (res.status !== 'Success') return

  getCkData.value = true
  formBody.value = res.data
}

onMounted(() => {
  getFaq()
})
</script>

<template>
  <div>
    <VForm @submit="submitForm" v-slot="{ errors }" class="container mx-auto px-3 py-6">
      <h4 class="text-h2 leading-h2 mb-56px fw-700">編輯公告</h4>
      <MyLabel title="公告標題" label="title" :require="true" class="mb-6" :class="{'!mb-1':errors.title}" >
        <VField v-model="formBody.title" name="title" id="title" label="公告標題" placeholder="公告標題" rules="required"
          class="w-full text-h6 h-48px leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3"
          :class="{'!border-#FF5D71':errors.title}" >
        </VField>
      </MyLabel>
      <span v-if="errors.title" class="block text-#FF5D71 mb-3 text-14px">{{ errors.title }}</span>

      <MyLabel title="公告內容" label="content" :require="true" class="mb-6" :class="{'!mb-1':errors.content}">
        <VField v-model="formBody.content" name="content" id="content" label="公告內容" placeholder="公告內容" rules="required"
          class="w-full text-h6 h-120px leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3"
          >
          <Ckeditor v-model="formBody.content" :getCkData="getCkData"></Ckeditor>
        </VField>
      </MyLabel>
      <span v-if="errors.content" class="block text-#FF5D71 mb-3 text-14px">{{ errors.content }}</span>

      <!-- <MyLabel title="公告更新時間" label="date" :require="true" class="mb-6" :class="{'!mb-1':errors.content}">
        <VField v-model="formBody.date"  name="date" id="date" label="更新時間" rules="required" type="number">
          <VueDatePicker v-model="formBody.date" :format="'yyyy/MM/dd HH:mm'" model-type="timestamp" locale="zh-TW" auto-apply>
            <template #dp-input="{ value }">
              <input :value="value" type="text" placeholder="請選擇開始時間" class="w-full h-48px text-h6 leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3"
                :class="{'!border-#FF5D71':errors.date}">
            </template>
          </VueDatePicker>
        </VField>
      </MyLabel> -->
      <span v-if="errors.date" class="block text-#FF5D71 mb-3 text-14px">{{ errors.startTime }}</span>
      <FooterProposal>
        <button type="submit" class="mt-4 lg:mt-0 px-6 py-3 bg-brand-1 hover:bg-brand-2 duration-300 text-white rounded-3xl">儲存公告</button>
      </FooterProposal>
    </VForm>
  </div>
</template>
