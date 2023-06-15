<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { proposalStore } from '@/stores'
import { fetchProposal } from '@/api'
const proposalStoreInstance = proposalStore()
const { PROPOSAL_REF } = storeToRefs(proposalStoreInstance)
const route = useRoute()

const VITE_FRONT_BUILD_URL = import.meta.env.VITE_FRONT_BUILD_URL
async function getProposal () {
  const query = {
    proposalUrl: route.params.proposal
  }
  const res = await fetchProposal.get(query)
  if (res.status !== 'Success') return

  PROPOSAL_REF.value = res.data
}

onMounted(() => {
  if (PROPOSAL_REF.value.name.length === 0) {
    getProposal()
  }
})
</script>

<template>
  <div class="fixed flex flex-col lg:flex-row lg:items-center lg:justify-between left-0 bottom-0 lg:h-80px b-t-line b-t-2 w-100vw bg-white px-6 py-4 lg:px-10">
    <a :href="`${VITE_FRONT_BUILD_URL}/#/proposal/${PROPOSAL_REF.customizedUrl}`" target="_blank" class="flex items-center lg:max-w-50%">
      <p class="mr-4"> {{ PROPOSAL_REF.name }}</p>
      <span class="mdi mdi-open-in-new text-xl"></span>
    </a>
    <slot />
  </div>
</template>
