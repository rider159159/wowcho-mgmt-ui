import { defineStore } from 'pinia'
import { UserInfo } from '@/interface'
import { REMOVE_TOKEN } from '@/utils'

export const userInfoStore = defineStore('user-info-store', () => {
  // 也可以使用 any   const USER_INFO_REF: any = ref({})
  const USER_INFO_REF = ref(UserInfo)
  const USER_LOGIN_ROUTE_REF = ref('')

  function FN_LOGOUT (): void {
    USER_INFO_REF.value = UserInfo
    REMOVE_TOKEN()
  }

  return {
    USER_INFO_REF,
    FN_LOGOUT,
    USER_LOGIN_ROUTE_REF
  }
})
