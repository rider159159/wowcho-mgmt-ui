import { defineStore } from 'pinia'
import { proposal } from '@/interface'

export const proposalStore = defineStore('message-store', () => {
  const PROPOSAL_REF = ref({ ...proposal })

  return {
    PROPOSAL_REF
  }
})
