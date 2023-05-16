<script setup lang="ts">
import { fetchMember } from '@/api'
import { Swal } from '@/plugins/sweet-alert'

const router = useRouter()

async function submitForm(value:any) {
  const formBody = value
  const response = await fetchMember.register(formBody)
  console.log(response)
  if (response.status !== 'Success') return
  Swal.fire({
    icon: 'success',
    title: '註冊成功，請登入帳號',
    confirmButtonText: '確定',
    confirmButtonColor: '#2378BF',
    timer: 3000
  })
  emits('switchToLogin')
  // router.push({ name: 'login' })
}

const passwordShow = ref(true)
const passwordType = ref('password')

function togglePasswordType(show:boolean, type:string) {
  passwordShow.value = show
  passwordType.value = type
}

const emits = defineEmits(['switchToLogin'])
</script>

<template>
  <section class="flex justify-center w-full px-4 pb-12">
    <VForm class="w-full md:w-75% xl:w-50% flex flex-col gap-4" @submit="submitForm">
      <img src="/footer_logo.svg" alt="">
      <div class="text-h3 text-center my-10px">
        <span class="mdi mdi-account-plus text-h3 text-brand6"></span>
        註冊
      </div>
      <div class="text-14px">
        已經有帳號了嗎?
        <button @click="emits('switchToLogin')" class="text-brand2 bg-white">登入</button>
      </div>
      <div>
        <label for="account" class="flex flex-col">
          <p class="mb-2 h6">帳號</p>
          <VField type="text" name="account" label="帳號" rules="required" class="text-h6 leading-h4 px-2 mb-2 rounded b border-[#ccc] focus:outline-none focus:ring-1 focus:ring-brand-1 focus:border-brand-1" />
        </label>
        <ErrorMessage name="account" class="block text-red-500 text-13px"/>
      </div>
      <div>
        <label for="email" class="flex flex-col">
          <p class="mb-2 h6">電子信箱</p>
          <VField type="email" name="email" label="電子信箱" rules="required|email" class="text-h6 leading-h4 px-2 mb-2 rounded b border-[#ccc] focus:outline-none focus:ring-1 focus:ring-brand-1 focus:border-brand-1" />
        </label>
        <ErrorMessage name="email" class="block text-red-500 text-13px"/>
      </div>
      <div>
        <label for="password" class="flex flex-col">
          <p class="mb-2">密碼:</p>
          <VField name="password" label="密碼" rules="required|password" v-slot="{ field }">
            <div class="relative">
              <input v-bind="field" :type="passwordType" class="w-full text-h6 leading-h4 px-2 mb-2 rounded b border-[#ccc] focus:outline-none focus:ring-1 focus:ring-brand-1 focus:border-brand-1">
              <span v-if="passwordShow" @click="togglePasswordType(false,'text')" class="mdi mdi-eye text-h4 absolute right-4 cursor-pointer"></span>
              <span v-if="!passwordShow" @click="togglePasswordType(true,'password')" class="mdi mdi-eye-off text-h4 absolute right-4 cursor-pointer"></span>
            </div>
          </VField>
        </label>
        <ErrorMessage name="password" class="block text-red-500 text-13px"/>
      </div>
      <button type="submit" class="mt-4 w-full py-2 bg-brand-1 text-white rounded-3xl">註冊</button>
    </VForm>
  </section>
</template>
