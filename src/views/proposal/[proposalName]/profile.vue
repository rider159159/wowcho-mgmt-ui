<script setup lang="ts">
import { fetchBusinessProfile } from '@/api'
import { toast } from '@/plugins'

onMounted(() => { getBusinessProfile() })

async function getBusinessProfile() {
  // 取得商業檔案
  const res = await fetchBusinessProfile.get()
  if (res.status !== 'Success') return
  getCkData.value = true
  formBody.value = res.data
}

function patchBusinessProfile(formData: any) {
  // 更新商業檔案
  return fetchBusinessProfile.update(formData)
}

const getCkData = ref(false)

// 有 api 後會拔掉
const formBody = ref({
  businessName: '',
  businessEmail: '',
  businessIntro: '',
  businessImage: '',
  email: '',
  facebook: '',
  instagram: '',
  website: ''
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
  <h4 class="text-h2 font-bold leading-h2 mb-56px">商業檔案設定</h4>
  <VForm @submit="submitForm" v-slot="{ errors }" class="m-a flex flex-col lg:flex-row gap-10 items-center lg-items-start">

    <section class=" w-full lg:w-1/4 pt-40px">
      <svg v-if="formBody.businessImage == undefined" class="w-full" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 33V32C16 28.6863 18.6863 26 22 26H26C29.3137 26 32 28.6863 32 32V33" stroke="#369CF0" stroke-width="2" stroke-linecap="round"/>
        <path d="M24 23C21.7909 23 20 21.2091 20 19C20 16.7909 21.7909 15 24 15C26.2091 15 28 16.7909 28 19C28 21.2091 26.2091 23 24 23Z" stroke="#369CF0" stroke-width="2" stroke-linecap="round"/>
        <rect x="0.5" y="0.5" width="47" height="47" rx="23.5" stroke="#70BEFB"/>
      </svg>
      <img v-else :src="formBody.businessImage" class="w-full rounded-5xl">
      <Upload v-model="formBody.businessImage" labelTitle="上傳個人圖片" class="m-a mt-8"></Upload>
    </section>

    <section class="w-full lg:w-3/4 flex flex-col gap-6 pt-20px">
      <MyLabel title="提案單位名稱" label="businessName" :require="true">
      <VField v-model="formBody.businessName" name="businessName" id="businessName" label="提案單位名稱" placeholder="請輸入你的單位名稱" rules="required"
          class="w-full h-48px text-h6 leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3"
          :class="{'!border-#FF5D71':errors.businessName}" />
          <span v-if="errors.businessName" class="block text-#FF5D71 mt-4 text-14px">{{ errors.businessName }}</span>
      </MyLabel>

      <MyLabel title="提案單位 Email" label="email" :require="true" >
        <VField v-model="formBody.businessEmail" name="businessEmail" id="email" label="提案單位 Email" placeholder="example@mail.com" rules="required"
          class="w-full h-48px text-h6 leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3"
          :class="{'!border-#FF5D71':errors.businessEmail}" />
          <span v-if="errors.businessEmail" class="block text-#FF5D71 mt-4 text-14px">{{ errors.businessEmail }}</span>
      </MyLabel>

      <MyLabel title="Facebook 網址" label="facebook">
        <input v-model="formBody.facebook" id="facebook" placeholder="https://facebook.com/page-name"
          class="w-full h-48px text-h6 leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3"
        />
      </MyLabel>

      <MyLabel title="Instagram 網址" label="Instagram">
        <input v-model="formBody.instagram" id="Instagram" placeholder="https://instagram.com/account-name"
          class="w-full h-48px text-h6 leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3"
        />
      </MyLabel>

      <MyLabel title="網站網址" label="website">
        <input v-model="formBody.website" id="website" placeholder="https://www.example.com"
          class="w-full h-48px text-h6 leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3"
        />
      </MyLabel>

      <MyLabel title="商業檔案介紹" label="businessIntro">
        <Markdown v-model="formBody.businessIntro" :getCkData="getCkData" name="businessIntro" label="website" class="mb-4"></Markdown>
        <ul>
          <li class="text-gray-2 text-14px leading-5 ml-12px xl:ml-0 mb-12px xl:mb-0 !ml-0">接受 Markdown 語法</li>
        </ul>
      </MyLabel>

      <button type="submit" class="mt-4 w-full py-2 bg-brand-1 hover:bg-brand-2 duration-300 text-white rounded-3xl">儲存商業檔案</button>
    </section>
  </VForm>
</template>
