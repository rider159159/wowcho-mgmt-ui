<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: () => false
  },
  width: {
    type: String,
    default: () => ''
  },
  title: {
    type: String,
    default: () => ''
  },
  titleClass: {
    type: String
  },
  headerClass: {
    type: String
  },
  bodyClass: {
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
      <div class="fixed top-0 left-0 h-full w-full bg-black/50"></div>
      <div class="fixed top-0 left-0 z-40 flex h-full w-full items-center justify-center">
        <!-- Modal 整體 -->
        <div class="max-h-90vh rounded-10px relative overflow-hidden bg-white" :class="props.width ? `${props.width}` : 'w-90% md:w-600px'">
          <!-- Modal Header -->
          <div class="px-20px py-10px sticky top-0 left-0 flex items-center justify-between" :class="headerClass">
            <h2 class="text-18px fw-700 select-none text-black" :class="titleClass">{{ props.title }}</h2>
            <span @click="closeModal" class="mdi mdi-close text-30px px-2 cursor-pointer"></span>
          </div>
          <!-- Modal Body -->
          <div class="max-h-70vh p-20px w-full overflow-y-auto" :class="bodyClass">
            <slot />
          </div>
        </div>
      </div>
    </section>
  </transition>
</template>
