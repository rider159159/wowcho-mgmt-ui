<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: () => false
  },
  title: {
    type: String,
    default: () => ''
  },
  width: {
    type: String,
    default: () => ''
  },
  titleClass: {
    type: String
  }
})
const emits = defineEmits(['update:modelValue', 'closeModal', 'saveClick'])
const closeModal = () => {
  emits('update:modelValue', false)
}
</script>
<template>
  <transition name="fade">
    <section v-if="modelValue">
      <div class="fixed top-0 left-0 h-full w-full bg-black/40"></div>
      <div class="fixed top-0 left-0 z-40 flex h-full w-full items-center justify-center">
        <!-- 不可點擊外面關閉 -->
        <div class="max-h-90vh rounded-10px relative overflow-hidden bg-white" :class="props.width ? `w-${props.width}` : 'w-90% md:w-600px'">
          <div v-if="props.title" class="px-20px py-10px bg-primaryDarkBlue sticky top-0 left-0 flex w-full items-center justify-between" :class="titleClass">
            <h2 class="text-18px fw-700 select-none text-black">{{ props.title }}</h2>
            <img @click="closeModal" class="w-30px cursor-pointer" src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414z'/%3e%3c/svg%3e" alt="">
          </div>
          <div class="max-h-70vh p-20px w-full overflow-y-auto bg-white">
            <slot />
          </div>
        </div>
      </div>
    </section>
  </transition>
</template>
