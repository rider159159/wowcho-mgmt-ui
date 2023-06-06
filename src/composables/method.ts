import { Ref, onMounted, onBeforeUnmount } from 'vue'

export function useClickOutside(el: Ref<null | HTMLElement>, handler: (e: Event) => void) {
  const listener = (event: Event) => {
    if (!el.value || el.value.contains(event.target as Node)) {
      return
    }
    handler(event)
  }

  onMounted(() => {
    document.addEventListener('click', listener)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('click', listener)
  })
}
