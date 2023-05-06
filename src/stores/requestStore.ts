import { defineStore } from 'pinia'
import {  UserInfo } from '@/interface'
import { REMOVE_TOKEN } from '@/utils'

export const requestStore = defineStore('request-store', () => {
  const isLoading = ref(false)
  const loadingArray = ref<Array<object>>([])

  const ADD_LOADING = (loadingToken:any) => {
    console.log(loadingToken)
    loadingArray.value.push(loadingToken);
  };

  const REMOVE_TARGET_LOADING = (loadingToken) => {
    const loadingRequestIndex = loadingArray.value.findIndex((item) => item.uuid === loadingToken.uuid);
    loadingArray.value.splice(loadingRequestIndex, 1);
  }
  return {
    isLoading,
    loadingArray,
    ADD_LOADING,
    REMOVE_TARGET_LOADING,
  }
})

