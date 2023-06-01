<script setup lang="ts">
import { fetchBusinessProfile } from '@/api'
import { toast } from '@/plugins'

onMounted(() => { getBusinessProfile() })

function getBusinessProfile() {
  // 取得商業檔案
  return fetchBusinessProfile.get()
}

function patchBusinessProfile(formData: any) {
  // 更新商業檔案
  return fetchBusinessProfile.update(formData)
}

// 有 api 後會拔掉
const formBody = ref({
  name: 'xxxxxx',
  email: 'aaa@bbb.cc',
  facebook: 'https://aaaaaa.xxxxxx',
  twitter: 'https://aaaaaa.xxxxxx',
  line: 'xxxxxx.xxxx'
})

async function submitForm() {
  const formData = JSON.parse(JSON.stringify(formBody.value))
  const res = await patchBusinessProfile(formData)
  if (res.status !== 'Success') return

  toast.success('修改商業檔案成功', {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000,
    theme: 'colored'
  })
}
</script>

<template>
  <VForm @submit="submitForm" v-slot="{ errors }" class="container mx-auto px-3 py-6">
    <h4 class="text-h2 font-bold leading-h2 mb-56px">商業檔案</h4>

    <MyLabel title="提案單位名稱" label="name" :require="true" class="mb-6" :class="{'!mb-1':errors.name}">
      <VField v-model="formBody.name"  name="name" id="name" label="提案單位名稱" placeholder="雨傘王" rules="required"
        class="w-full h-48px text-h6 leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3"
        :class="{'!border-#FF5D71':errors.name}" />
    </MyLabel>
    <span v-if="errors.name" class="block text-#FF5D71 mb-3 text-14px">{{ errors.name }}</span>

    <MyLabel title="Email" label="email" class="mb-6" :class="{'!mb-1':errors.email}">
      <VField v-model="formBody.email"  name="email" id="email" label="Email" placeholder="example@gmail.com"
        class="w-full h-48px text-h6 leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3"
        :class="{'!border-#FF5D71':errors.email}" />
    </MyLabel>
    <span v-if="errors.email" class="block text-#FF5D71 mb-3 text-14px">{{ errors.email }}</span>

    <MyLabel title="Facebook" label="facebook" class="mb-6" :class="{'!mb-1':errors.facebook}">
      <VField v-model="formBody.facebook"  name="facebook" id="facebook" label="Facebook" placeholder="abc123"
        class="w-full h-48px text-h6 leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3"
        :class="{'!border-#FF5D71':errors.facebook}" />
    </MyLabel>
    <span v-if="errors.facebook" class="block text-#FF5D71 mb-3 text-14px">{{ errors.facebook }}</span>

    <MyLabel title="Twitter" label="twitter" class="mb-6" :class="{'!mb-1':errors.twitter}">
      <VField v-model="formBody.twitter"  name="twitter" id="twitter" label="Twitter" placeholder="abc123"
        class="w-full h-48px text-h6 leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3"
        :class="{'!border-#FF5D71':errors.twitter}" />
    </MyLabel>
    <span v-if="errors.twitter" class="block text-#FF5D71 mb-3 text-14px">{{ errors.twitter }}</span>

    <MyLabel title="Line" label="line" class="mb-6" :class="{'!mb-1':errors.line}">
      <VField v-model="formBody.line"  name="line" id="line" label="Line" placeholder="abc123"
        class="w-full h-48px text-h6 leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3"
        :class="{'!border-#FF5D71':errors.line}" />
    </MyLabel>
    <span v-if="errors.line" class="block text-#FF5D71 mb-3 text-14px">{{ errors.line }}</span>

    <button type="submit" class="mt-4 w-full py-2 bg-brand-1 hover:bg-brand-2 duration-300 text-white rounded-3xl">儲存商業檔案</button>
  </VForm>
</template>
