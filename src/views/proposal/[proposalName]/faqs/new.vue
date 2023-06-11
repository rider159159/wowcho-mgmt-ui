<script setup lang="ts">
import { fetchFaq } from '@/api'
import { toast } from '@/plugins'
const router = useRouter()
const route = useRoute()
const formBody:any = ref({})

async function submitForm() {
  const formData = JSON.parse(JSON.stringify(formBody.value))
  formData.customizedUrl = route.params.proposal
  const res = await fetchFaq.create(formData)
  if (res.status !== 'Success') return

  toast.success('新增問答成功', {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000,
    theme: 'colored'
  })
  setTimeout(() => {
    router.push({
      name: 'faqsIndex',
      params: {
        proposal: res.data.customizedUrl
      }
    })
  }, 2100)
}
</script>

<template>
  <div>
    <VForm @submit="submitForm" v-slot="{ errors }" class="container mx-auto px-3 py-6">
      <h4 class="text-h2 leading-h2 mb-56px fw-700">新增常見問答</h4>
      <MyLabel title="常見問答標題" label="title" :require="true" class="mb-6" :class="{'!mb-1':errors.title}" >
        <VField v-model="formBody.title" name="title" id="title" label="常見問答標題" placeholder="常見問答標題" rules="required"
          class="w-full text-h6 h-48px leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3"
          :class="{'!border-#FF5D71':errors.title}" >
        </VField>
      </MyLabel>
      <span v-if="errors.title" class="block text-#FF5D71 mb-3 text-14px">{{ errors.title }}</span>

      <MyLabel title="常見問答內容" label="content" :require="true" class="mb-6" :class="{'!mb-1':errors.content}" remark="(最少 350 字，可使用 MarkDown 語法)">
        <VField v-model="formBody.content" v-slot="{ field, errors }" name="content" id="content" label="常見問答內容" rules="required"
          class="w-full text-h6 h-120px leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3"
          >
          <Ckeditor v-bind="field" :class="{'ckError':errors.content}"></Ckeditor>
        </VField>
      </MyLabel>
      <span v-if="errors.content" class="block text-#FF5D71 mb-3 text-14px">{{ errors.content }}</span>

      <!-- <MyLabel title="常見問答更新時間" label="content" :require="true" class="mb-6" :class="{'!mb-1':errors.content}">
        <VField v-model="formBody.date"  name="date" id="date" label="提案開始時間" rules="required" type="number" placeholder="請根據你計畫的需求,估算你所需要募集的金額。">
          <VueDatePicker v-model="formBody.date"  :format="'yyyy/MM/dd HH:mm'" model-type="timestamp" locale="zh-TW" auto-apply>
            <template #dp-input="{ value }">
              <input :value="value" type="text" placeholder="請選擇開始時間" class="w-full h-48px text-h6 leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3"
                :class="{'!border-#FF5D71':errors.date}">
            </template>
          </VueDatePicker>
        </VField>
      </MyLabel>
      <span v-if="errors.date" class="block text-#FF5D71 mb-3 text-14px">{{ errors.startTime }}</span> -->
      <button type="submit" class="mt-4 w-full py-2 bg-brand-1 hover:bg-brand-2 duration-300 text-white rounded-3xl">儲存問答</button>

    </VForm>
  </div>
</template>
