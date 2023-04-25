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
  console.log(birthday)
  typeof (birthday) === 'number' ? formData.birthday = birthday : formData.birthday = Date.parse(birthday)
  // 從 pinia 獲取資料
  formData.account = USER_INFO_REF.value.account
  console.log(formData)
  const res = await fetchMember.editProfile(formData)
  if (res.status !== 'Success') return
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
  // formBody.value.account = 'ryder'
})
</script>

<template>
  <div>
    <h1>個人資料修改</h1>
    <VForm class="w-full grid gap-4 grid-cols-6 items-center" @submit="submitForm">
      <section class="self-start col-span-2">
        <img v-if="formBody.image == undefined" src="/default.webp" class="w-32">
        <img v-else :src="formBody.image" class="w-32">
        <Upload v-model="formBody.image"></Upload>
      </section>
      <section class="flex flex-col col-span-4">
        <div>
          <label for="account" class="flex flex-col">
            <p class="mb-2 h6">真實姓名</p>
            <VField v-model="formBody.name" type="text" name="name" label="真實姓名" rules="required" class="text-h6 leading-h4 px-2 mb-2 rounded b border-[#ccc] focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600" />
          </label>
          <ErrorMessage name="name" class="block text-red-500"/>
        </div>
        <div>
          <label for="username" class="flex flex-col">
            <p class="mb-2 h6">用戶名稱</p>
            <VField v-model="formBody.username" type="text" name="username" label="用戶名稱" rules="required" class="text-h6 leading-h4 px-2 mb-2 rounded b border-[#ccc] focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600" />
          </label>
          <ErrorMessage name="username" class="block text-red-500"/>
        </div>
        <div>
          <label for="email" class="flex flex-col">
            <p class="mb-2 h6">信箱</p>
            <VField v-model="formBody.email" type="email" name="email" label="電子信箱" rules="required|email" class="text-h6 leading-h4 px-2 mb-2 rounded b border-[#ccc] focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600" />
          </label>
          <ErrorMessage name="email" class="block text-red-500"/>
        </div>
        <div>
          <label for="isAllowedNotifications" class="flex">
            <input v-model="formBody.isAllowedNotifications" type="checkbox" id="isAllowedNotifications" class="text-h6 leading-h4 px-2 mb-2 rounded b border-[#ccc] focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600" />
            <p class="mb-2 h6">允許通知</p>
          </label>
        </div>
        <label for="isSubscribed" class="flex">
          <input v-model="formBody.isSubscribed" type="checkbox" id="isSubscribed" class="text-h6 leading-h4 px-2 mb-2 rounded b border-[#ccc] focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600" />
          <p class="mb-2 h6">訂閱電子報</p>
        </label>
        <div>
          <p class="mb-2 h6">請選擇性別</p>
          <select v-model="formBody.gender" id="gender" class="w-full text-h6 leading-h4 px-2 mb-2 rounded b border-[#ccc] focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600">
            <option v-for="item in genderList" :key="item.value" :value="item.value" >{{ item.name }}</option>
          </select>
        </div>
        <label for="birthday" class="flex flex-col">
          <p class="mb-2 h6">生日</p>
          <VueDatePicker v-model="formBody.birthday" :enableTimePicker="false" :format="'yyyy/MM/dd'" locale="zh-TW" auto-apply>
            <template #dp-input="{ value }">
              <input :value="value" type="text" class="w-full text-h6 leading-h4 px-2 rounded b border-[#ccc] focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600">
            </template>
          </VueDatePicker>
        </label>
        <label for="address" class="flex flex-col">
          <p class="mb-2 h6">地址</p>
          <input type="text" v-model="formBody.address" id="address" class="text-h6 leading-h4 px-2 mb-2 rounded b border-[#ccc] focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600">
        </label>
        <label for="website" class="flex flex-col">
          <p class="mb-2 h6">個人網站</p>
          <input type="text" v-model="formBody.website" id="website" class="text-h6 leading-h4 px-2 mb-2 rounded b border-[#ccc] focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600">
        </label>
        <label for="facebook" class="flex flex-col">
          <p class="mb-2 h6">FB 網址</p>
          <input type="text" v-model="formBody.facebook" id="facebook" class="text-h6 leading-h4 px-2 mb-2 rounded b border-[#ccc] focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600">
        </label>
        <label for="instagram" class="flex flex-col">
          <p class="mb-2 h6">IG 網址</p>
          <input type="text" v-model="formBody.instagram" id="instagram" class="text-h6 leading-h4 px-2 mb-2 rounded b border-[#ccc] focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600">
        </label>
        <label for="youtube" class="flex flex-col">
          <p class="mb-2 h6">YT 網址</p>
          <input type="text" v-model="formBody.youtube" id="youtube" class="text-h6 leading-h4 px-2 mb-2 rounded b border-[#ccc] focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600">
        </label>
      </section>
      <button type="submit" class="col-start-2 col-span-4 mt-4 w-full py-2 bg-brand-1 text-white rounded-3xl">修改個人資料</button>
    </VForm>
  </div>
</template>
