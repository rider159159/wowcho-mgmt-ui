import { defineStore } from 'pinia'

export const messageStore = defineStore('message-store', () => {
  const MESSAGE_REF = ref('')

  return {
    MESSAGE_REF
  }
})
