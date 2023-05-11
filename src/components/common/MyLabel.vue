<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  require: {
    type: Boolean,
    default: false
  },
  remark: {
    type: String,
    default: ''
  },
  class: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <label :for="props.label" class="block" :class="props.class">
    <div class="flex flex-col xl:flex-row xl:mb-3">
      <div class="flex items-start whitespace-pre">
        <span v-if="props.require" class="text-#FF5D71 mr-1">*</span>
        <h6 class="text-h5 leading-h5 xl:mr-4 mb-1 xl:mb-0">{{ props.title }}</h6>
      </div>
      <p class="text-gray-2 text-14px leading-5 ml-12px xl:ml-0 mb-12px xl:mb-0" :class="{'!ml-0':!props.require}">{{ props.remark }}</p>
    </div>
    <slot></slot>
  </label>
</template>
