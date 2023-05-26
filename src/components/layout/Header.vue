<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { userInfoStore } from '@/stores'

const store = userInfoStore()
const { USER_INFO_REF } = storeToRefs(store)
const { FN_LOGOUT } = userInfoStore()

const router = useRouter()

const showMenu = ref(false)
const showMemberMenu = ref(false)

function closeMemberMenu() {
  setTimeout(() => {
    showMemberMenu.value = false
  }, 100)
}

function logout () {
  FN_LOGOUT()
}
</script>

<template>
  <header class="fixed z-10 top-0 left-0 w-full">
    <nav
      class="relative flex w-full items-center justify-between bg-white py-2 text-neutral-600 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 dark:text-neutral-200 md:flex-wrap md:justify-start">
      <div class="flex w-full flex-wrap items-center justify-between px-6">
        <div
          class="container mx-auto !visible grow basis-[100%] items-center flex lg:basis-auto justify-between"
          id="navbarSupportedContentX">
          <img @click="router.push('/proposal')" class="cursor-pointer" src="/logo.svg" alt="">
          <!-- <div class="hidden lg:flex justify-between items-center relative">
            <form action="">
              <input type="text" name="search" placeholder="搜尋" class="w-80 outline outline-1 outline-brand-3 rounded-3xl py-2 px-5 pl-10">
            </form>
            <svg class="absolute left-3 top-1/2 -translate-y-1/2" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 20L15.514 15.506M18 9.5C18 11.7543 17.1045 13.9163 15.5104 15.5104C13.9163 17.1045 11.7543 18 9.5 18C7.24566 18 5.08365 17.1045 3.48959 15.5104C1.89553 13.9163 1 11.7543 1 9.5C1 7.24566 1.89553 5.08365 3.48959 3.48959C5.08365 1.89553 7.24566 1 9.5 1C11.7543 1 13.9163 1.89553 15.5104 3.48959C17.1045 5.08365 18 7.24566 18 9.5V9.5Z" stroke="#70BEFB" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div> -->
          <ul
            class="hidden lg:flex items-center gap-4">
            <li>
              <a
                class="block cursor-pointer transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                @click.prevent="router.push('/demo')"
                >範例</a
              >
            </li>
            <li data-te-nav-item-ref>
              <a
                class="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                href="#!"
                >探索</a
              >
            </li>
            <li data-te-nav-item-ref>
              <router-link
                class="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                to="/proposal/new"
                >提案</router-link
              >
            </li>
            <!-- <li data-te-nav-item-ref>
              <a
                class="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                href="#!"
                >
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 23C16.45 23 15.979 22.804 15.587 22.412C15.195 22.02 14.9993 21.5493 15 21V17C15 16.45 15.196 15.979 15.588 15.587C15.98 15.195 16.4507 14.9993 17 15H21C21.55 15 22.021 15.196 22.413 15.588C22.805 15.98 23.0007 16.4507 23 17V21C23 21.55 22.804 22.021 22.412 22.413C22.02 22.805 21.5493 23.0007 21 23H17ZM17 33C16.45 33 15.979 32.804 15.587 32.412C15.195 32.02 14.9993 31.5493 15 31V27C15 26.45 15.196 25.979 15.588 25.587C15.98 25.195 16.4507 24.9993 17 25H21C21.55 25 22.021 25.196 22.413 25.588C22.805 25.98 23.0007 26.4507 23 27V31C23 31.55 22.804 32.021 22.412 32.413C22.02 32.805 21.5493 33.0007 21 33H17ZM27 23C26.45 23 25.979 22.804 25.587 22.412C25.195 22.02 24.9993 21.5493 25 21V17C25 16.45 25.196 15.979 25.588 15.587C25.98 15.195 26.4507 14.9993 27 15H31C31.55 15 32.021 15.196 32.413 15.588C32.805 15.98 33.0007 16.4507 33 17V21C33 21.55 32.804 22.021 32.412 22.413C32.02 22.805 31.5493 23.0007 31 23H27ZM27 33C26.45 33 25.979 32.804 25.587 32.412C25.195 32.02 24.9993 31.5493 25 31V27C25 26.45 25.196 25.979 25.588 25.587C25.98 25.195 26.4507 24.9993 27 25H31C31.55 25 32.021 25.196 32.413 25.588C32.805 25.98 33.0007 26.4507 33 27V31C33 31.55 32.804 32.021 32.412 32.413C32.02 32.805 31.5493 33.0007 31 33H27ZM17 21H21V17H17V21ZM27 21H31V17H27V21ZM27 31H31V27H27V31ZM17 31H21V27H17V31Z" fill="#369CF0"/>
                  <rect x="0.5" y="0.5" width="47" height="47" rx="23.5" stroke="#70BEFB"/>
                </svg>
                </a
              >
            </li>
            <li v-if="!isLogin" data-te-nav-item-ref>
              <a
                class="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                href="#!"
                ><MyButton class="bg-brand-1 text-white outline outline-2 outline-brand-1 hover:bg-white hover:text-brand-1">登入/註冊</MyButton></a
              >
            </li> -->
            <li class="cursor-pointer relative" data-te-nav-item-ref>
              <!-- 使用者預設頭像 -->
              <svg v-if="USER_INFO_REF.image == null" @click="showMemberMenu = !showMemberMenu" @blur="closeMemberMenu" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 33V32C16 28.6863 18.6863 26 22 26H26C29.3137 26 32 28.6863 32 32V33" stroke="#369CF0" stroke-width="2" stroke-linecap="round"/>
                <path d="M24 23C21.7909 23 20 21.2091 20 19C20 16.7909 21.7909 15 24 15C26.2091 15 28 16.7909 28 19C28 21.2091 26.2091 23 24 23Z" stroke="#369CF0" stroke-width="2" stroke-linecap="round"/>
                <rect x="0.5" y="0.5" width="47" height="47" rx="23.5" stroke="#70BEFB"/>
              </svg>
              <!-- 使用者頭像 -->
              <img v-else :src="USER_INFO_REF.image" @click="showMemberMenu = !showMemberMenu" class="w-48px h-48px rounded-full">
              <ul tabindex="0" v-if="showMemberMenu" class="member-menu absolute right-0 -bottom-65 w-40 bg-white">
                <li class="px-4 py-3" data-te-nav-item-ref>
                  <router-link
                    class="block cursor-pointer transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                    to=""
                    >贊助紀錄</router-link
                  >
                </li>
                <li class="px-4 py-3" data-te-nav-item-ref>
                  <router-link
                    class="block cursor-pointer transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                    to="/proposal"
                    >提案紀錄</router-link
                  >
                </li>
                <li class="px-4 py-3" data-te-nav-item-ref>
                  <router-link
                    class="block cursor-pointer transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                    to="/profile"
                    >個人設定</router-link
                  >
                </li>
                <li class="px-4 py-3 border-t-1 border-line" data-te-nav-item-ref>
                  <a
                    @click.prevent="logout()"
                    class="block cursor-pointer transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                    href="#!"
                    >登出</a
                  >
                </li>
              </ul>
            </li>
          </ul>
          <svg @click="showMenu = true" class="lg:hidden cursor-pointer" width="26" height="18" viewBox="0 0 26 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.333496 2.05545C0.333496 1.28839 0.955323 0.666565 1.72239 0.666565H23.9446C24.7117 0.666565 25.3335 1.28839 25.3335 2.05545C25.3335 2.82252 24.7117 3.44434 23.9446 3.44434H1.72239C0.955324 3.44434 0.333496 2.82252 0.333496 2.05545ZM0.333496 8.9999C0.333496 8.23284 0.955323 7.61101 1.72239 7.61101H23.9446C24.7117 7.61101 25.3335 8.23284 25.3335 8.9999C25.3335 9.76696 24.7117 10.3888 23.9446 10.3888H1.72239C0.955324 10.3888 0.333496 9.76696 0.333496 8.9999ZM0.333496 15.9443C0.333496 15.1773 0.955323 14.5555 1.72239 14.5555H23.9446C24.7117 14.5555 25.3335 15.1773 25.3335 15.9443C25.3335 16.7114 24.7117 17.3332 23.9446 17.3332H1.72239C0.955324 17.3332 0.333496 16.7114 0.333496 15.9443Z" fill="#636466"/>
          </svg>
        </div>
      </div>
    </nav>
    <div v-if="showMenu" class="fixed top-0 w-screen h-screen bg-white py-2 px-8 sm:px-0">
      <div class="container h-full flex flex-col justify-between mx-auto">
        <div>
          <div class="flex justify-between items-center mb-8">
            <img src="/logo.svg" alt="">
            <svg @click="showMenu = false;" class="cursor-pointer" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.9929 3.02143C19.5491 2.4652 19.5491 1.56337 18.9929 1.00714C18.4366 0.450913 17.5348 0.450913 16.9786 1.00714L10 7.98571L3.02143 1.00714C2.4652 0.450912 1.56337 0.450913 1.00714 1.00714C0.450913 1.56337 0.450913 2.4652 1.00714 3.02143L7.98571 10L1.00714 16.9786C0.450912 17.5348 0.450913 18.4366 1.00714 18.9929C1.56337 19.5491 2.4652 19.5491 3.02143 18.9929L10 12.0143L16.9786 18.9929C17.5348 19.5491 18.4366 19.5491 18.9929 18.9929C19.5491 18.4366 19.5491 17.5348 18.9929 16.9786L12.0143 10L18.9929 3.02143Z" fill="#636466"/>
            </svg>
          </div>
          <div class="w-full flex justify-between items-center relative mb-8">
            <form class="w-full" action="">
              <input type="text" name="search" placeholder="搜尋" class="w-full outline outline-1 outline-brand-3 rounded-3xl py-2 px-5 pl-10">
            </form>
            <svg class="absolute left-3 top-1/2 -translate-y-1/2" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 20L15.514 15.506M18 9.5C18 11.7543 17.1045 13.9163 15.5104 15.5104C13.9163 17.1045 11.7543 18 9.5 18C7.24566 18 5.08365 17.1045 3.48959 15.5104C1.89553 13.9163 1 11.7543 1 9.5C1 7.24566 1.89553 5.08365 3.48959 3.48959C5.08365 1.89553 7.24566 1 9.5 1C11.7543 1 13.9163 1.89553 15.5104 3.48959C17.1045 5.08365 18 7.24566 18 9.5V9.5Z" stroke="#70BEFB" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <ul>
            <li data-te-nav-item-ref class="mb-8">
              <a
                class="block cursor-pointer transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                @click.prevent="router.push('/demo')"
                >範例</a
              >
            </li>
            <li data-te-nav-item-ref class="mb-8">
              <router-link
                class="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                to=""
                >探索</router-link
              >
            </li>
            <li data-te-nav-item-ref class="mb-8">
              <router-link
                class="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                to="/proposal/new"
                >提案</router-link
              >
            </li>
            <!-- <li v-if="isLogin" data-te-nav-item-ref class="mb-8">
              <a
                class="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                >後台管理</a
              >
            </li> -->
            <li data-te-nav-item-ref class="mb-8">
              <p
                class="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 pb-5 [&.active]:text-black/90 border-b-1 border-line"
                >會員專區</p
              >
              <ul class="mt-3 ml-4">
                <li data-te-nav-item-ref class="mb-3">
                  <router-link
                    class="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                    to=""
                    >贊助紀錄</router-link
                  >
                </li>
                <li data-te-nav-item-ref class="mb-3">
                  <router-link
                    class="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                    to="/proposal"
                    >提案紀錄</router-link
                  >
                </li>
                <li data-te-nav-item-ref class="mb-3">
                  <router-link
                    class="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                    to="/profile"
                    >個人設定</router-link
                  >
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <a
          @click.prevent="logout()"
          class="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
          >
          <MyButton class="w-full outline outline-2 outline-brand-1 bg-white text-brand-1 hover:bg-brand-1 hover:text-white">登出</MyButton>
        </a>
      </div>
    </div>
  </header>
</template>

<style scoped>
.member-menu {
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.16);
}
</style>

<style scoped>
.member-menu {
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.16);
}
</style>
