<script setup lang="ts">
import { fetchMember } from '@/api'
import { storeToRefs } from 'pinia'
import { userInfoStore } from '@/stores'
import { profile } from '@/interface'
import { Swal } from '@/plugins/sweet-alert'
const { USER_INFO_REF } = storeToRefs(userInfoStore())

const genderList = ref([
  { name: '其他', value: 0 },
  { name: '生理男', value: 1 },
  { name: '生理女', value: 2 },
  { name: '心理男', value: 3 },
  { name: '心理女', value: 4 }
])
const formBody = ref(profile)

// 透過 JWT 獲得會員資料
async function getProfile() {
  const res = await fetchMember.getProfile()
  if (res.status !== 'Success') return
  formBody.value = res.data
}

async function submitForm() {
  // 深拷貝
  const formData = JSON.parse(JSON.stringify(formBody.value))
  // birthday 轉 TimeStamp
  const birthday = formData.birthday
  // 若生日是 TimeStamp 不做事，若非 TimeStamp 轉換成 TimeStamp
  typeof (birthday) === 'number' ? formData.birthday = birthday : formData.birthday = Date.parse(birthday)
  // 從 pinia 獲取帳號資料
  formData.account = USER_INFO_REF.value.account
  const res = await fetchMember.editProfile(formData)
  if (res.status !== 'Success') return
  // 修改資料後，修改資料存至 Pinia
  USER_INFO_REF.value = res.data
  Swal.fire({
    icon: 'success',
    title: '修改成功',
    confirmButtonText: '確定',
    confirmButtonColor: '#2378BF',
    timer: 3000
  })
}

onMounted(() => {
  getProfile()
})
</script>

<template>
  <div>
    <div class="w-full text-h4 font-bold p-5 text-center">個人資料設定</div>
    <VForm @submit="submitForm" v-slot="{ errors }" class="m-a flex flex-col lg:flex-row gap-10 items-center lg-items-start">
      <section class="justify-center lg:w-1/4 pt-40px">
        <svg v-if="formBody.image == undefined" class="w-full" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 33V32C16 28.6863 18.6863 26 22 26H26C29.3137 26 32 28.6863 32 32V33" stroke="#369CF0" stroke-width="2" stroke-linecap="round"/>
          <path d="M24 23C21.7909 23 20 21.2091 20 19C20 16.7909 21.7909 15 24 15C26.2091 15 28 16.7909 28 19C28 21.2091 26.2091 23 24 23Z" stroke="#369CF0" stroke-width="2" stroke-linecap="round"/>
          <rect x="0.5" y="0.5" width="47" height="47" rx="23.5" stroke="#70BEFB"/>
        </svg>
        <img v-else :src="formBody.image" class="w-full rounded-5xl">
        <Upload v-model="formBody.image" labelTitle="上傳商業檔案圖片" class="m-a mt-8"></Upload>
      </section>
      <section class="lg:w-3/4 flex flex-col gap-6 pt-20px">
        <div>
          <label for="username" class="flex flex-col">
            <div class="flex">
              <span class="text-#FF5D71 mr-1">*</span>
              <p class="text-h5 leading-h5 xl:mr-4 mb-2">用戶名稱</p>
            </div>
            <VField v-model="formBody.username" type="text" id="username" name="username" label="用戶名稱" rules="required"
              class="w-full h-48px text-h6 leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3"
              :class="{'!border-#FF5D71':errors.username}"
            />
          </label>
          <span v-if="errors.username" class="block text-#FF5D71 text-14px">{{ errors.account }}</span>
        </div>

        <div>
          <label for="name" class="flex flex-col">
            <p class="text-h5 leading-h5 xl:mr-4 mb-2">真實姓名</p>
            <VField v-model="formBody.name" type="text" name="name" label="真實姓名" id="name"
              class="w-full h-48px text-h6 leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3"
              :class="{'!border-#FF5D71':errors.name}"
            />
          </label>
          <span v-if="errors.name" class="block text-#FF5D71 text-14px">{{ errors.account }}</span>
        </div>

        <div>
          <label for="email" class="flex flex-col">
            <div class="flex">
              <span class="text-#FF5D71 mr-1">*</span>
              <p class="text-h5 leading-h5 xl:mr-4 mb-2">信箱</p>
            </div>
            <VField v-model="formBody.email" type="email" name="email" label="電子信箱" rules="required|email" id="email"
              class="w-full h-48px text-h6 leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3"
              :class="{'!border-#FF5D71':errors.email}"
            />
          </label>
          <span v-if="errors.email" class="block text-#FF5D71 text-14px">{{ errors.account }}</span>
        </div>
        <div>
          <p class="text-h5 leading-h5 xl:mr-4 mb-2">請選擇性別</p>
          <select name="gender" v-model="formBody.gender" rules="required"
            class="w-full h-48px text-h6 leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3"
          >
            <option v-for="item in genderList" :key="item.value" :value="item.value" >{{ item.name }}</option>
          </select>
          <!-- <select v-model="formBody.gender" id="gender">
          </select> -->
        </div>
        <label for="birthday" class="flex flex-col">
          <p class="text-h5 leading-h5 xl:mr-4 mb-2">生日</p>
          <VueDatePicker v-model="formBody.birthday" :enableTimePicker="false" :format="'yyyy/MM/dd'" locale="zh-TW" auto-apply>
            <template #dp-input="{ value }">
              <div class="relative">
                <input :value="value" type="text"
                class="w-full h-48px text-h6 leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3">
                <!-- <span class="mdi mdi-calendar-month absolute left-2 top-1 transform -translate-y-1"></span> -->
              </div>
            </template>
          </VueDatePicker>
        </label>
        <label for="address" class="flex flex-col">
          <p class="text-h5 leading-h5 xl:mr-4 mb-2">地址</p>
          <input type="text" v-model="formBody.address" id="address"
            class="w-full h-48px text-h6 leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3">
        </label>
        <div>
          <label for="isAllowedNotifications" class="flex">
            <input v-model="formBody.isAllowedNotifications" type="checkbox" id="isAllowedNotifications" class="text-h6 leading-h4 px-2 mb-4 rounded b border-[#ccc] focus:outline-none focus:ring-1 focus:ring-brand-1 focus:border-brand-1" />
            <p class="mb-4 ml-1 h6">允許通知</p>
          </label>
          <label for="isSubscribed" class="flex">
            <input v-model="formBody.isSubscribed" type="checkbox" id="isSubscribed" class="text-h6 leading-h4 px-2 mb-6 rounded b border-[#ccc] focus:outline-none focus:ring-1 focus:ring-brand-1 focus:border-brand-1" />
            <p class="mb-6 ml-1 h6">訂閱電子報</p>
          </label>
        </div>
        <!-- <label for="website" class="flex flex-col">
          <p class="mb-2 h6">個人網站</p>
          <input type="text" v-model="formBody.website" id="website" class="text-h6 leading-h4 px-2 mb-6 rounded b border-[#ccc] focus:outline-none focus:ring-1 focus:ring-brand-1 focus:border-brand-1">
        </label>
        <label for="facebook" class="flex flex-col">
          <p class="mb-2 h6">FB 網址</p>
          <input type="text" v-model="formBody.facebook" id="facebook" class="text-h6 leading-h4 px-2 mb-6 rounded b border-[#ccc] focus:outline-none focus:ring-1 focus:ring-brand-1 focus:border-brand-1">
        </label>
        <label for="instagram" class="flex flex-col">
          <p class="mb-2 h6">IG 網址</p>
          <input type="text" v-model="formBody.instagram" id="instagram" class="text-h6 leading-h4 px-2 mb-6 rounded b border-[#ccc] focus:outline-none focus:ring-1 focus:ring-brand-1 focus:border-brand-1">
        </label>
        <label for="youtube" class="flex flex-col">
          <p class="mb-2 h6">YT 網址</p>
          <input type="text" v-model="formBody.youtube" id="youtube" class="text-h6 leading-h4 px-2 mb-6 rounded b border-[#ccc] focus:outline-none focus:ring-1 focus:ring-brand-1 focus:border-brand-1">
        </label> -->
        <button type="submit" class="col-start-2 col-span-4 mt-4 w-full py-2 border border-brand1 bg-brand-1 text-white hover:bg-white hover:text-brand1 duration-300 rounded-3xl">修改個人資料</button>
      </section>
    </VForm>
  </div>
</template>
