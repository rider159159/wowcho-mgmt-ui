<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { userInfoStore } from '@/stores'

const store = userInfoStore()
const { USER_INFO_REF } = storeToRefs(store)

const router = useRouter()
</script>

<template>
  <header class="fixed z-10 top-0 left-0 w-full">
    <nav
      class="relative flex w-full items-center justify-between bg-white py-2 text-neutral-600 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 dark:text-neutral-200 md:flex-wrap md:justify-start">
      <div class="flex w-full flex-wrap items-center justify-between px-6">
        <div
          class="!visible grow basis-[100%] items-center flex lg:basis-auto justify-between"
          id="navbarSupportedContentX">
          <ul
            class="mr-auto flex gap-4">
            <li>
              <a
                class="block cursor-pointer transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                @click.prevent="router.push('/demo')"
                >測試範例頁面</a
              >
            </li>
            <li data-te-nav-item-ref>
              <a
                class="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                href="#!"
                >Features</a
              >
            </li>
            <li data-te-nav-item-ref>
              <a
                class="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                href="#!"
                >Pricing</a
              >
            </li>
            <li data-te-nav-item-ref>
              <a
                class="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                href="#!"
                >About</a
              >
            </li>
          </ul>
          <img class="w-30px h-30px rounded" :src="USER_INFO_REF.photo" alt="">
        </div>
      </div>
    </nav>
  </header>
</template>
