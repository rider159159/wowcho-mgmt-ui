import { defineStore } from 'pinia'

export const requestStore = defineStore('request-store', () => {
  const isLoading = ref(false)
  const loadingArray = ref<object[]>([])

  const ADD_LOADING = (loadingToken: any) => {
    loadingArray.value.push(loadingToken)
  }

  const REMOVE_TARGET_LOADING = (loadingToken: any) => {
    const loadingRequestIndex = loadingArray.value.findIndex((item: any) => item.uuid === loadingToken.uuid)
    loadingArray.value.splice(loadingRequestIndex, 1)
  }
  return {
    isLoading,
    loadingArray,
    ADD_LOADING,
    REMOVE_TARGET_LOADING
  }
})
