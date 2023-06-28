<script setup lang="ts">
import { fetchPlacard } from '@/api'
import { toast } from '@/plugins'
const router = useRouter()
const route = useRoute()
const formBody:any = ref({})

async function submitForm() {
  const formData = JSON.parse(JSON.stringify(formBody.value))
  formData.customizedUrl = route.params.proposal
  const res = await fetchPlacard.create(formData)
  if (res.status !== 'Success') return

  toast.success('新增公告成功', {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000,
    theme: 'colored'
  })
  setTimeout(() => {
    router.push({
      name: 'announceList',
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
      <h4 class="text-h2 leading-h2 mb-56px fw-700">新增公告</h4>
      <MyLabel title="公告標題" label="title" :require="true" class="mb-6" :class="{'!mb-1':errors.title}" >
        <VField v-model="formBody.title" name="title" id="title" label="公告" placeholder="公告" rules="required"
          class="w-full text-h6 h-48px leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3"
          :class="{'!border-#FF5D71':errors.title}" >
        </VField>
      </MyLabel>
      <span v-if="errors.title" class="block text-#FF5D71 mb-3 text-14px">{{ errors.title }}</span>

      <MyLabel title="公告內容" label="content" :require="true" class="mb-6" :class="{'!mb-1':errors.content}" remark="(最少 350 字，可使用 MarkDown 語法)">
        <VField v-model="formBody.content" v-slot="{ field, errors }" name="content" id="content" label="募資商品詳細介紹" rules="required"
          class="w-full text-h6 h-120px leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3"
          >
          <Ckeditor v-bind="field" :class="{'ckError':errors.content}"></Ckeditor>
        </VField>
      </MyLabel>
      <span v-if="errors.content" class="block text-#FF5D71 mb-3 text-14px">{{ errors.content }}</span>

      <FooterProposal>
        <button type="submit" class="mt-4 lg:mt-0 px-6 py-3 bg-brand-1 hover:bg-brand-2 duration-300 text-white rounded-3xl">儲存公告</button>
      </FooterProposal>
    </VForm>
  </div>
</template>
