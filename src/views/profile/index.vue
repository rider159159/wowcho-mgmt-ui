<script setup lang="ts">
import { fetchMember } from '@/api'
import { storeToRefs } from 'pinia'
import { userInfoStore } from '@/stores'
import { profile } from '@/interface'
import { Swal } from '@/plugins/sweet-alert'
const { USER_INFO_REF } = storeToRefs(userInfoStore())

const gender = ref([
  { name: '其他', value: 0 },
  { name: '生理男', value: 1 },
  { name: '生理女', value: 2 },
  { name: '心理男', value: 3 },
  { name: '心理女', value: 4 }
])
const formBody = ref(profile)
async function getProfile() {
  console.log(USER_INFO_REF.value)
  const res = await fetchMember.getProfile()
  if (res.status !== 'Success') return
  formBody.value = res.data
}

async function submitForm() {
  const formData = JSON.parse(JSON.stringify(formBody.value))
  formData.birthday = Date.parse(formData.birthday)
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
  formBody.value.account = 'ryder'
})
</script>

<template>
  <div>
    <h1>個人資料修改</h1>
    <VForm class="w-full flex flex-col gap-4 items-center" @submit="submitForm">
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
        <select id="gender" class="w-full text-h6 leading-h4 px-2 mb-2 rounded b border-[#ccc] focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600">
          <option v-for="item in gender" :key="item.value" :value="item.value" >{{ item.name }}</option>
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
      <button type="submit" class="mt-4 w-full py-2 bg-brand-1 text-white rounded-3xl">修改個人資料</button>
    </VForm>
  </div>
</template>
