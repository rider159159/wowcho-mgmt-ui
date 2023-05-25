<script setup lang="ts">
import { fetchMember } from '@/api'
import { SET_TOKEN } from '@/utils'
import { Swal } from '@/plugins/sweet-alert'
import { userLoginStore } from '@/stores'
const router = useRouter()
const emits = defineEmits(['switchToSignup','closeModal','loginTure'])
const LOGIN_STORE = userLoginStore()

async function submitForm(value:any) {
  const formBody = value
  const res = await fetchMember.login(formBody)
  SET_TOKEN(res.data.token)
  Swal.fire({
    icon: 'success',
    title: '登入成功!',
    confirmButtonText: '確定',
    confirmButtonColor: '#2378BF',
    timer: 3000
  })
  setTimeout(() => {
    // router.push({ path: '/proposal' })
    emits('closeModal')
    emits('loginTure')
    router.push({ path: LOGIN_STORE.TO_ROUTE || '/' })
    
  }, 1000)
}

const passwordShow = ref(true)
const passwordType = ref('password')
function togglePasswordType(show:boolean, type:string) {
  passwordShow.value = show
  passwordType.value = type
}

</script>

<template>
  <section class="flex justify-center w-full px-4 pb-12">
    <VForm class="w-full md:w-75% xl:w-50% flex flex-col gap-4" @submit="submitForm">
      <img src="/footer_logo.svg" alt="">
      
      <div class="text-h3 text-center my-10px">
        <span class="mdi mdi-account-circle text-h3 text-brand6"></span> 登入
      </div>
      <div class="text-14px">
        尚未成為會員? 
        <button @click="emits('switchToSignup')" class="text-brand2 bg-white">註冊帳號</button>
      </div>
      <div>
        <label for="account" class="flex flex-col">
          <p class="mb-2 h6">帳號</p>
          <VField type="text" name="account" label="帳號" rules="required" class="text-h6 leading-h4 px-2 mb-2 rounded b border-[#ccc] focus:outline-none focus:ring-1 focus:ring-brand-1 focus:border-brand-1" placeholder="請輸入帳號"/>
        </label>
        <ErrorMessage name="account" class="block text-red-500 text-13px"/>
      </div>
      <div>
        <label for="password" class="flex flex-col">
          <p class="mb-2">密碼:</p>
          <VField name="password" label="密碼" rules="required|password" v-slot="{ field }">
            <div class="relative">
              <input v-bind="field" :type="passwordType" class="w-full text-h6 leading-h4 px-2 mb-2 rounded b border-[#ccc] focus:outline-none focus:ring-1 focus:ring-brand-1 focus:border-brand-1" placeholder="請輸入密碼">
              <span v-if="passwordShow" @click="togglePasswordType(false,'text')" class="mdi mdi-eye text-h4 absolute right-4"></span>
              <span v-if="!passwordShow" @click="togglePasswordType(true,'password')" class="mdi mdi-eye-off text-h4 absolute right-4"></span>
            </div>
          </VField>
        </label>
        <ErrorMessage name="password" class="block text-red-500 text-13px"/>
      </div>
      <button type="submit" class="mt-4 w-full py-2 bg-brand-1 text-white rounded-3xl">登入</button>
    </VForm>
  </section>
</template>
