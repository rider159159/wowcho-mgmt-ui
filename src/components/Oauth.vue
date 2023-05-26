<script setup lang="ts">

import { fetchMember } from '@/api'
import { SET_TOKEN } from '@/utils'
import { Swal } from '@/plugins/sweet-alert'
import { userInfoStore } from '@/stores'
declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    handleCredentialResponse: (response: any) => void;
  }
}
const oauthId = import.meta.env.VITE_OAUTH_ID
const router = useRouter()
const USER_STORE = userInfoStore()

async function handleCredentialResponse (response:any) {
  const formBody = {
    token: response.credential
  }
  const res = await fetchMember.oauthLogin(formBody)
  if (res.status !== 'Success') return
  const toRoute = USER_STORE.USER_LOGIN_ROUTE_REF
  SET_TOKEN(res.data.token)

  Swal.fire({
    icon: 'success',
    title: '登入成功，為您跳轉頁面',
    confirmButtonText: '確定',
    confirmButtonColor: '#2378BF',
    timer: 3000
  })
  if (toRoute.length > 0) {
    setTimeout(() => {
      router.push(toRoute)
      USER_STORE.USER_LOGIN_ROUTE_REF = ''
    }, 2000)
  } else {
    setTimeout(() => {
      router.push('/')
    }, 2000)
  }

  // 獲得 token，打 get 個人資料 API
  const profileRes = await fetchMember.getProfile()
  USER_STORE.USER_INFO_REF = profileRes.data
}

onMounted(() => {
  window.handleCredentialResponse = handleCredentialResponse
  // window.handleCredentialResponse = handleCredentialResponse
  // 在這裡動態加載 Google SDK
  const script = document.createElement('script')
  script.src = 'https://accounts.google.com/gsi/client'
  script.async = true
  script.defer = true
  document.head.appendChild(script)
})
</script>

<template>
  <div>
    <div id="g_id_onload"
      :data-client_id="oauthId"
      data-context="signin"
      data-ux_mode="popup"
      data-callback="handleCredentialResponse"
      data-auto_prompt="false">
    </div>
    <!-- data-login_uri="http://localhost:3008/login/oauth" -->

    <div class="g_id_signin"
        data-type="standard"
        data-shape="rectangular"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left">
    </div>
  </div>
</template>
