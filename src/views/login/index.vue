<script setup lang="ts">
import { fetchMember } from '@/api'
import { SET_TOKEN } from '@/utils'
import { Swal } from '@/plugins/sweet-alert'
const router = useRouter()

async function submitForm(value:any) {
  const formBody = value
  const res = await fetchMember.login(formBody)
  SET_TOKEN(res.data.token)
  Swal.fire({
    icon: 'success',
    title: '登入成功，即將將前往首頁!',
    confirmButtonText: '確定',
    confirmButtonColor: '#2378BF',
    timer: 3000
  })
  setTimeout(() => {
    router.push({ path: '/proposal' })
  }, 2000)
}

const passwordShow = ref(true)
const passwordType = ref('password')
function togglePasswordType(show:boolean, type:string) {
  passwordShow.value = show
  passwordType.value = type
}
</script>

<template>
  <section class="flex flex-col items-center justify-center w-full px-4">
    <Oauth></Oauth>
    <VForm  @submit="submitForm"  v-slot="{ errors }" class="w-full md:w-75% xl:w-50% flex flex-col gap-4">
      <div>
        <label for="account" class="flex flex-col">
          <p class="mb-2 h6">帳號</p>
          <VField type="text" name="account" label="帳號" rules="required" id="account"
            class="w-full h-48px text-h6 leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3"
            :class="{'!border-#FF5D71':errors.account}"
          />
        </label>
        <span v-if="errors.account" class="block text-#FF5D71 text-14px">{{ errors.account }}</span>
      </div>
      <div>
        <label for="password" class="flex flex-col">
          <p class="mb-2">密碼:</p>
          <VField name="password" label="密碼" rules="required" v-slot="{ field }">
            <div class="relative">
              <input v-bind="field" :type="passwordType" id="password"
                class="w-full h-48px text-h6 leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3"
                :class="{'!border-#FF5D71':errors.password}">
              <span v-if="passwordShow" @click="togglePasswordType(false,'text')" class="mdi mdi-eye text-h4 cursor-pointer absolute top-3 right-4"></span>
              <span v-if="!passwordShow" @click="togglePasswordType(true,'password')" class="mdi mdi-eye-off text-h4 cursor-pointer absolute top-3 right-4"></span>
            </div>
          </VField>
        </label>
        <span v-if="errors.password" class="block text-#FF5D71 text-14px">{{ errors.password }}</span>
      </div>
      <button type="submit" class="mt-4 w-full py-2 py-2 bg-brand-1 hover:bg-brand-2 duration-300 text-white rounded-3xl">登入</button>
    </VForm>
  </section>
</template>
