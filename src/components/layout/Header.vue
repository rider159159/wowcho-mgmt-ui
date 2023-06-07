<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { userInfoStore } from '@/stores'
import { Swal } from '@/plugins'
import { useClickOutside } from '@/composables'
import { Ref } from 'vue'

const route = useRoute()
const router = useRouter()
const store = userInfoStore()
const { USER_INFO_REF } = storeToRefs(store)
const { FN_LOGOUT } = userInfoStore()

const RWDMenu = ref(false)
const showMemberMenu = ref(false)

function closeMenu() {
  showMemberMenu.value = false
  RWDMenu.value = false
}

function logout () {
  FN_LOGOUT()
  Swal.fire({
    text: '已成功登出，將切換至登入頁面。',
    icon: 'success'
  })
  closeMenu()
  setTimeout(() => {
    router.push({
      name: 'login'
    })
  }, 1000)
}

const isLogin = computed(() => USER_INFO_REF.value.email.length >= 1)

// 下拉選單
const loginMenuRef = ref(null)
// 下拉選單點擊外側隱藏下拉選單
useClickOutside(loginMenuRef, () => { showMemberMenu.value = false })

const RWDMenuBtnRef: Ref<null | HTMLElement> = ref(null)

function RWDMenuControl () {
  RWDMenu.value = !RWDMenu.value
  RWDMenuBtnRef.value?.classList.toggle('open')
}

const showProposalMenu = computed(() => {
  return route.meta.proposalMenu || false
})
</script>

<template>
  <header class="fixed z-10 top-0 left-0 w-full">
    <nav
      class="relative flex w-full items-center justify-between bg-white py-2 text-neutral-600 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 dark:text-neutral-200 md:flex-wrap md:justify-start">
      <div class="flex w-full flex-wrap items-center justify-between px-6">
        <div
          class="container mx-auto !visible grow basis-[100%] items-center flex lg:basis-auto justify-between"
          id="navbarSupportedContentX">
          <img @click="router.push('/proposal')" class="cursor-pointer max-w-[calc(100vw-150px)]" src="/logo.svg">
          <ul
            class="hidden lg:flex items-center gap-4">
            <li>
              <a
                class="block cursor-pointer transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                @click.prevent="router.push('/demo')"
                >範例</a
              >
            </li>
            <li>
              <router-link
                class="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                to="/proposal/new"
                >提案</router-link
              >
            </li>

            <li v-if="!isLogin">
              <div class="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white [&.active]:text-black/90">
                <RouterLink to="/signup" class="rounded-5xl cursor-pointer transition duration-500 px-6 bg-brand-1 py-2 text-white outline outline-2 outline-brand-1 hover:bg-white hover:text-brand-1">註冊</RouterLink>
              </div>
            </li>
            <li v-if="!isLogin">
              <div class="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white [&.active]:text-black/90">
                <RouterLink to="/login" class="rounded-5xl cursor-pointer transition duration-500 px-6 bg-brand-1 py-2 text-white outline outline-2 outline-brand-1 hover:bg-white hover:text-brand-1">登入</RouterLink>
              </div>
            </li>
            <li  v-if="isLogin" ref="loginMenuRef" class="cursor-pointer relative">
              <!-- 使用者預設頭像 -->
              <svg v-if="USER_INFO_REF.image == null" @click="showMemberMenu = !showMemberMenu" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 33V32C16 28.6863 18.6863 26 22 26H26C29.3137 26 32 28.6863 32 32V33" stroke="#369CF0" stroke-width="2" stroke-linecap="round"/>
                <path d="M24 23C21.7909 23 20 21.2091 20 19C20 16.7909 21.7909 15 24 15C26.2091 15 28 16.7909 28 19C28 21.2091 26.2091 23 24 23Z" stroke="#369CF0" stroke-width="2" stroke-linecap="round"/>
                <rect x="0.5" y="0.5" width="47" height="47" rx="23.5" stroke="#70BEFB"/>
              </svg>
              <!-- 使用者頭像 -->
              <img v-else :src="USER_INFO_REF.image" @click="showMemberMenu = !showMemberMenu" class="w-48px h-48px rounded-full">
              <!-- 下拉選單 -->
              <ul v-if="showMemberMenu" class="member-menu absolute right-0 -bottom-50 w-40 bg-white">
                <li class="px-4 py-3">
                  <router-link
                    class="block cursor-pointer transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                    to="/proposal"
                    @click="closeMenu"
                    >提案紀錄</router-link
                  >
                </li>
                <li class="px-4 py-3">
                  <router-link
                    class="block cursor-pointer transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                    to="/profile"
                    @click="closeMenu"
                    >商業檔案設定</router-link
                  >
                </li>
                <li class="px-4 py-3 border-t-1 border-line">
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

          <a ref="RWDMenuBtnRef" @click.prevent="RWDMenuControl" class="toggle-menu inline-block lg:hidden relative w-50px h-50px  cursor-pointer">
            <i></i>
            <i></i>
            <i></i>
          </a>
        </div>
      </div>
    </nav>
    <!-- RWD Menu -->
    <transition name="slide">
      <div v-show="RWDMenu" class="fixed top-72px left-0 w-screen h-screen bg-white py-2 px-8"
      >
        <div  class="container flex flex-col justify-between mx-auto">
          <div>
            <ul v-if="isLogin">
              <li class="mb-8">
                <router-link
                  class="block transition hover:text-neutral-700 focus:text-neutral-700 py-2 text-lg"
                  to="/proposal/new"
                  @click="closeMenu"
                  >提案</router-link
                >
              </li>
              <li class="mb-6">
                <p
                  class="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 border-b-1 border-line text-lg pb-5"
                  >會員專區</p
                >
                <ul class="mt-3 ml-4">
                  <li class="mb-2">
                    <router-link
                      class="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700  py-2"
                      to="/proposal"
                      @click="closeMenu"
                      >提案紀錄</router-link
                    >
                  </li>
                  <li class="mb-2">
                    <router-link
                      class="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 py-2"
                      to="/profile"
                      @click="closeMenu"
                      >商業檔案設定</router-link
                    >
                  </li>
                </ul>
              </li>
              <li v-if="showProposalMenu" class="mb-8">
                <p
                  class="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 pb-5 border-b-1 border-line text-lg"
                >
                募資活動操作</p>
                <!-- 募資活動下列表 -->
                <ul class="mt-3 ml-4">
                  <li class="mb-2">
                    <router-link
                      @click="closeMenu"
                      :to="`/proposal/${route.params.proposal}/dashboard`"
                      class="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 py-2"
                    >
                      <!-- <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.6748 14.6645L20.1397 13.352C20.2123 12.9066 20.2498 12.452 20.2498 11.9973C20.2498 11.5426 20.2123 11.0879 20.1397 10.6426L21.6748 9.33008C21.7906 9.23095 21.8735 9.09893 21.9124 8.95156C21.9513 8.80419 21.9445 8.64846 21.8928 8.50508L21.8717 8.44414C21.4491 7.26295 20.8162 6.16797 20.0037 5.21211L19.9615 5.16289C19.863 5.047 19.7316 4.96369 19.5847 4.92394C19.4379 4.88419 19.2824 4.88987 19.1389 4.94023L17.2334 5.61758C16.5303 5.04102 15.7451 4.58633 14.8967 4.26758L14.5287 2.27539C14.501 2.12549 14.4282 1.98758 14.3202 1.87999C14.2122 1.77241 14.074 1.70023 13.924 1.67305L13.8607 1.66133C12.6397 1.44102 11.3553 1.44102 10.1342 1.66133L10.0709 1.67305C9.9209 1.70023 9.78271 1.77241 9.6747 1.87999C9.56669 1.98758 9.49398 2.12549 9.46622 2.27539L9.0959 4.27695C8.25424 4.59577 7.47043 5.05022 6.77559 5.62227L4.85606 4.94023C4.71254 4.88947 4.55698 4.88359 4.41003 4.92336C4.26309 4.96313 4.13173 5.04667 4.0334 5.16289L3.99122 5.21211C3.17968 6.16865 2.54694 7.26345 2.12325 8.44414L2.10215 8.50508C1.99668 8.79805 2.0834 9.12617 2.32012 9.33008L3.87403 10.6566C3.80137 11.0973 3.76622 11.5473 3.76622 11.9949C3.76622 12.4449 3.80137 12.8949 3.87403 13.3332L2.32012 14.6598C2.20433 14.7589 2.12146 14.8909 2.08252 15.0383C2.04359 15.1857 2.05043 15.3414 2.10215 15.4848L2.12325 15.5457C2.54747 16.727 3.17559 17.8168 3.99122 18.7777L4.0334 18.827C4.13197 18.9428 4.26333 19.0262 4.41019 19.0659C4.55704 19.1057 4.7125 19.1 4.85606 19.0496L6.77559 18.3676C7.47403 18.9418 8.2545 19.3965 9.0959 19.7129L9.46622 21.7145C9.49398 21.8644 9.56669 22.0023 9.6747 22.1098C9.78271 22.2174 9.9209 22.2896 10.0709 22.3168L10.1342 22.3285C11.3665 22.55 12.6284 22.55 13.8607 22.3285L13.924 22.3168C14.074 22.2896 14.2122 22.2174 14.3202 22.1098C14.4282 22.0023 14.501 21.8644 14.5287 21.7145L14.8967 19.7223C15.7448 19.4044 16.5344 18.9482 17.2334 18.3723L19.1389 19.0496C19.2824 19.1004 19.438 19.1063 19.5849 19.0665C19.7318 19.0267 19.8632 18.9432 19.9615 18.827L20.0037 18.7777C20.8193 17.8145 21.4475 16.727 21.8717 15.5457L21.8928 15.4848C21.9982 15.1965 21.9115 14.8684 21.6748 14.6645ZM18.4756 10.9191C18.5342 11.273 18.5647 11.6363 18.5647 11.9996C18.5647 12.3629 18.5342 12.7262 18.4756 13.0801L18.3209 14.0199L20.0717 15.5176C19.8063 16.129 19.4712 16.7079 19.0732 17.2426L16.8982 16.4715L16.1623 17.0762C15.6022 17.5355 14.9787 17.8965 14.3037 18.1496L13.4107 18.4848L12.9912 20.7582C12.3293 20.8332 11.661 20.8332 10.999 20.7582L10.5795 18.4801L9.69356 18.1402C9.02559 17.8871 8.4045 17.5262 7.84903 17.0691L7.11309 16.4621L4.92403 17.2402C4.52559 16.7035 4.19278 16.1246 3.92559 15.5152L5.69512 14.0035L5.54278 13.066C5.48653 12.7168 5.45606 12.3559 5.45606 11.9996C5.45606 11.641 5.48418 11.2824 5.54278 10.9332L5.69512 9.9957L3.92559 8.48398C4.19043 7.87227 4.52559 7.2957 4.92403 6.75898L7.11309 7.53711L7.84903 6.93008C8.4045 6.47305 9.02559 6.11211 9.69356 5.85898L10.5818 5.52383L11.0014 3.2457C11.66 3.1707 12.3326 3.1707 12.9936 3.2457L13.4131 5.51914L14.3061 5.8543C14.9787 6.10742 15.6045 6.46836 16.1647 6.92773L16.9006 7.53242L19.0756 6.76133C19.474 7.29805 19.8068 7.87695 20.074 8.48633L18.3232 9.98398L18.4756 10.9191ZM11.9998 7.64023C9.72168 7.64023 7.87481 9.48711 7.87481 11.7652C7.87481 14.0434 9.72168 15.8902 11.9998 15.8902C14.2779 15.8902 16.1248 14.0434 16.1248 11.7652C16.1248 9.48711 14.2779 7.64023 11.9998 7.64023ZM13.8561 13.6215C13.6126 13.8656 13.3233 14.0593 13.0047 14.1912C12.6861 14.3231 12.3446 14.3908 11.9998 14.3902C11.299 14.3902 10.6404 14.116 10.1436 13.6215C9.8994 13.378 9.70578 13.0887 9.57385 12.7701C9.44192 12.4515 9.37427 12.11 9.37481 11.7652C9.37481 11.0645 9.64903 10.4059 10.1436 9.90898C10.6404 9.41211 11.299 9.14023 11.9998 9.14023C12.7006 9.14023 13.3592 9.41211 13.8561 9.90898C14.1002 10.1524 14.2938 10.4418 14.4258 10.7604C14.5577 11.0789 14.6253 11.4204 14.6248 11.7652C14.6248 12.466 14.3506 13.1246 13.8561 13.6215Z" fill="#636466"/>
                      </svg> -->
                      控制中心
                    </router-link>
                  </li>
                  <li class="mb-2">
                    <router-link
                      class="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 py-2"
                      :to="`/proposal/${route.params.proposal}/edit`"
                      @click="closeMenu"
                    >
                      <!-- <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 7H6C5.46957 7 4.96086 7.21071 4.58579 7.58579C4.21071 7.96086 4 8.46957 4 9V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H15C15.5304 20 16.0391 19.7893 16.4142 19.4142C16.7893 19.0391 17 18.5304 17 18V17" stroke="#636466" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M16 5.00011L19 8.00011M20.385 6.58511C20.7788 6.19126 21.0001 5.65709 21.0001 5.10011C21.0001 4.54312 20.7788 4.00895 20.385 3.61511C19.9912 3.22126 19.457 3 18.9 3C18.343 3 17.8088 3.22126 17.415 3.61511L9 12.0001V15.0001H12L20.385 6.58511Z" stroke="#636466" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg> -->
                      修改計畫
                    </router-link>
                  </li>
                  <li class="mb-2">
                    <!-- routeMatched -->
                    <router-link
                      class="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 py-2"
                      :to="`/proposal/${route.params.proposal}/options`"
                      @click="closeMenu"
                    >
                      <!-- <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M18.75 9V21.75H5.25V2.25H12V6.375C12 7.824 13.176 9 14.625 9H18.75ZM18.5685 6.75L14.25 2.4315V6.375C14.25 6.582 14.418 6.75 14.625 6.75H18.5685ZM3 1.5C3 1.10218 3.15804 0.720644 3.43934 0.43934C3.72064 0.158035 4.10218 0 4.5 0L14.379 0C14.7768 8.49561e-05 15.1583 0.158176 15.4395 0.4395L20.5605 5.5605C20.8418 5.84174 20.9999 6.22321 21 6.621V22.5C21 22.8978 20.842 23.2794 20.5607 23.5607C20.2794 23.842 19.8978 24 19.5 24H4.5C4.10218 24 3.72064 23.842 3.43934 23.5607C3.15804 23.2794 3 22.8978 3 22.5V1.5ZM8.625 12C8.32663 12 8.04048 12.1185 7.8295 12.3295C7.61853 12.5405 7.5 12.8266 7.5 13.125C7.5 13.4234 7.61853 13.7095 7.8295 13.9205C8.04048 14.1315 8.32663 14.25 8.625 14.25H15.375C15.6734 14.25 15.9595 14.1315 16.1705 13.9205C16.3815 13.7095 16.5 13.4234 16.5 13.125C16.5 12.8266 16.3815 12.5405 16.1705 12.3295C15.9595 12.1185 15.6734 12 15.375 12H8.625ZM7.5 16.875C7.5 16.5766 7.61853 16.2905 7.8295 16.0795C8.04048 15.8685 8.32663 15.75 8.625 15.75H12.375C12.6734 15.75 12.9595 15.8685 13.1705 16.0795C13.3815 16.2905 13.5 16.5766 13.5 16.875C13.5 17.1734 13.3815 17.4595 13.1705 17.6705C12.9595 17.8815 12.6734 18 12.375 18H8.625C8.32663 18 8.04048 17.8815 7.8295 17.6705C7.61853 17.4595 7.5 17.1734 7.5 16.875Z" fill="#636466"/>
                      </svg> -->
                      計畫方案
                    </router-link>
                  </li>
                  <li class="mb-2">
                    <router-link
                      class="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 py-2"
                      :to="`/proposal/${route.params.proposal}/backers`"
                      @click="closeMenu"
                    >
                      <!-- <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.5 4H5.5C4.94772 4 4.5 4.44772 4.5 5V21C4.5 21.5523 4.94772 22 5.5 22H18.5C19.0523 22 19.5 21.5523 19.5 21V5C19.5 4.44772 19.0523 4 18.5 4Z" stroke="#636466" stroke-width="2" stroke-linejoin="round"/>
                        <path d="M9 2V5M15 2V5M8 9.5H16M8 13.5H14M8 17.5H12" stroke="#636466" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg> -->
                      贊助訂單
                    </router-link>
                  </li>
                </ul>
              </li>
            </ul>
            <ul v-else class="flex flex-col h-full justify-evenly">
              <li>
                <router-link to="/login" class="block text-center mt-4 w-full py-2 py-2 bg-brand-1 hover:bg-brand-2 duration-300 text-white rounded-3xl">登入</router-link>
              </li>
              <li>
                <router-link to="/signup" class="block text-center mt-4 w-full py-2 py-2 bg-brand-1 hover:bg-brand-2 duration-300 text-white rounded-3xl">註冊</router-link>
              </li>
            </ul>
          </div>
          <a
            v-if="isLogin"
            @click.prevent="logout()"
            class="block transition duration-150 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30"
            >
            <MyButton class="w-full outline outline-2 outline-brand-1 bg-white text-brand-1 hover:bg-brand-1 hover:text-white">登出</MyButton>
          </a>
        </div>
      </div>
    </transition>
  </header>
</template>

<style scoped lang="scss">
.member-menu {
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.16);
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-out;
}

.slide-enter-from {
  transform: translateX(-100%);
}

.slide-enter-to {
  transform: translateX(0);
}

.slide-leave-to {
  transform: translateX(-100%);
}

.toggle-menu {
  & i {
    position: absolute;
    display: block;
    height: 4px;
    background: #636466;
    left: 0px;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    border-radius: 20px;
  }

  & i:nth-child(1) {
    top: 16px;
    width: 32px;
  }

  & i:nth-child(2) {
    top: 26px;
    left: 3px;
    width: 25px;
  }

  & i:nth-child(3) {
    top: 36px;
    width: 32px;
  }

  &.open i:nth-child(1) {
    top: 25px;
    -webkit-transform: rotateZ(45deg);
    transform: rotateZ(45deg);
  }

  &.open i:nth-child(2) {
    background: transparent;
  }

  &.open i:nth-child(3) {
    top: 25px;
    -webkit-transform: rotateZ(-45deg);
    transform: rotateZ(-45deg);
  }
}
</style>
