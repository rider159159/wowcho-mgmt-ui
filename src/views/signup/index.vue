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
    title: '註冊成功，將前往登入頁!',
    confirmButtonText: '確定',
    confirmButtonColor: '#2378BF',
    timer: 3000
  })
  router.push({ name: 'login' })
}

const passwordShow = ref(true)
const passwordType = ref('password')

function togglePasswordType(show:boolean, type:string) {
  passwordShow.value = show
  passwordType.value = type
}

</script>

<template>
  <section class="flex justify-center w-full px-4">
    <VForm class="w-full md:w-75% xl:w-50% flex flex-col gap-4" @submit="submitForm">
      <div>
        <label for="account" class="flex flex-col">
          <p class="mb-2 h6">帳號</p>
          <VField type="text" name="account" label="帳號" rules="required" class="text-h6 leading-h4 px-2 mb-2 rounded b border-[#ccc] focus:outline-none focus:ring-1 focus:ring-brand-1 focus:border-brand-1" />
        </label>
        <ErrorMessage name="account" class="block text-red-500"/>
      </div>
      <div>
        <label for="email" class="flex flex-col">
          <p class="mb-2 h6">電子信箱</p>
          <VField type="email" name="email" label="電子信箱" rules="required|email" class="text-h6 leading-h4 px-2 mb-2 rounded b border-[#ccc] focus:outline-none focus:ring-1 focus:ring-brand-1 focus:border-brand-1" />
        </label>
        <ErrorMessage name="email" class="block text-red-500"/>
      </div>
      <div>
        <label for="password" class="flex flex-col">
          <p class="mb-2">密碼:</p>
          <VField name="password" label="密碼" rules="required|min:8" v-slot="{ field }">
            <div class="relative">
              <input v-bind="field" :type="passwordType" class="w-full text-h6 leading-h4 px-2 mb-2 rounded b border-[#ccc] focus:outline-none focus:ring-1 focus:ring-brand-1 focus:border-brand-1">
              <span v-if="passwordShow" @click="togglePasswordType(false,'text')" class="mdi mdi-eye text-h4 absolute right-4 cursor-pointer"></span>
              <span v-if="!passwordShow" @click="togglePasswordType(true,'password')" class="mdi mdi-eye-off text-h4 absolute right-4 cursor-pointer"></span>
            </div>
          </VField>
        </label>
        <ErrorMessage name="password" class="block text-red-500"/>
      </div>
      <button type="submit" class="mt-4 w-full py-2 bg-brand-1 text-white rounded-3xl">註冊</button>
    </VForm>
  </section>
</template>
