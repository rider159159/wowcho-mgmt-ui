import { defineStore } from 'pinia'

export const userLoginStore = defineStore('user-login-store', () => {
  const SHOW_LOGIN_MODAL = ref(false) //for permission and header use
  const TO_ROUTE = ref('/'); // login redirect

  return {
    SHOW_LOGIN_MODAL,
    TO_ROUTE,
  }
})