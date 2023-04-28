<script setup lang="ts">
import { SET_TOKEN } from '@/utils'
// composables
import { calculateDiscount } from '@/composables/project'

// API 運用
import { fetchDemo } from '@/api'

// store 運用
import { storeToRefs } from 'pinia'
import { userInfoStore } from '@/stores'

// 額外套件運用
import Swal from 'sweetalert2'
import { toast } from '@/plugins'
const { FN_LOGOUT } = userInfoStore()
const { USER_INFO_REF } = storeToRefs(userInfoStore())

// 判斷環境
const env = import.meta.env.MODE

// 使用 router
const router = useRouter()

// : Promise<void> 也可以移除
async function getMemberInfo() : Promise<void> {
  const res = await fetchDemo.getMemberInfo()
  if (res.status !== 'Success') return
  // API 丟置 store
  USER_INFO_REF.value = res.data.userInfo
}

// 彈窗控制
const demoModal = ref(false)
function openModal() {
  demoModal.value = true
}

const projectList = ref<any>([])
async function getProductAll(): Promise<void> {
  const params = { id: '123' }
  const res = await fetchDemo.getProjectAll(params)
  if (res.status !== 'Success') return
  projectList.value = res.data.projectList
}

function toProject(item:any) {
  router.push({
    name: 'projects',
    params: {
      id: item.id
    }
  })
}

function saveCookie() {
  const cookie = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiIyNDAyODI5NTcyNzExMDkiLCJuYW1lIjoic3lzdGVtIiwiZ2l2ZW5fbmFtZSI6IlN5c3RlbSIsInN1YiI6IjI0MDI4Mjk1NzI3MTEwOSIsImp0aSI6ImEzYTY4ODE4LTE2YWMtNGE0MC1iM2ZiLTY5OGY5OWM1YTE3OSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvZXhwaXJhdGlvbiI6IjIwMjMvNC8xMyDkuIrljYggMDI6MjM6MDQiLCJyb2xlIjoiU3lzdGVtIiwibmJmIjoxNjgxMjg2NTg0LCJleHAiOjE2ODEzMjI1ODQsImlhdCI6MTY4MTI4NjU4NCwiaXNzIjoiU2luZ2xlU2lnbiJ9.by4lxi8xuxf7zleknkxdM9vVWaJaxL3FGxuEzHaokR0'
  SET_TOKEN(cookie)
}

const form = {
  name: '',
  content: '',
  comments: 0
}

async function submitForm() {
  const res = await fetchDemo.createPosts(form)
  if (res.status !== 'Success') return
  Swal.fire({
    icon: 'success',
    title: '新增成功'
  })
  console.log(res.data, '新增成功')
}

function openToast() {
  toast.success('測試', {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000,
    theme: 'colored'
  })
  toast.success('登入成功', {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000
  })
  toast.error('登入失敗', {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000
  })
}
const upload = ref('')
const ck = ref('')
</script>

<template>
  <section class="p-4">
    <div class="flex gap-4">
      <button @click.prevent="getMemberInfo"
        class="relative flex-none text-sm text-center font-semibold text-white py-2.5 px-4 rounded-lg bg-slate-900 dark:bg-sky-500 dark:text-white focus:outline-none hover:bg-slate-700 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:highlight-white/20 dark:hover:bg-sky-400 dark:focus:ring-2 dark:focus:ring-sky-600 dark:focus:ring-offset-slate-900">
        獲得使用者資料至 store
      </button>
      <button @click.prevent="FN_LOGOUT()"
        class="relative flex-none text-sm te`xt-center font-semibold text-white py-2.5 px-4 rounded-lg bg-slate-900 dark:bg-sky-500 dark:text-white focus:outline-none hover:bg-slate-700 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:highlight-white/20 dark:hover:bg-sky-400 dark:focus:ring-2 dark:focus:ring-sky-600 dark:focus:ring-offset-slate-900">
        登出
      </button>
      <button @click.prevent="openModal"
        class="relative flex-none text-sm text-center font-semibold text-white py-2.5 px-4 rounded-lg bg-slate-900 dark:bg-sky-500 dark:text-white focus:outline-none hover:bg-slate-700 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:highlight-white/20 dark:hover:bg-sky-400 dark:focus:ring-2 dark:focus:ring-sky-600 dark:focus:ring-offset-slate-900">
        開啟彈窗
      </button>
      <button @click.prevent="getProductAll"
        class="relative flex-none text-sm text-center font-semibold text-white py-2.5 px-4 rounded-lg bg-slate-900 dark:bg-sky-500 dark:text-white focus:outline-none hover:bg-slate-700 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:highlight-white/20 dark:hover:bg-sky-400 dark:focus:ring-2 dark:focus:ring-sky-600 dark:focus:ring-offset-slate-900">
        獲得商品列表
      </button>
      <button @click.prevent="saveCookie"
        class="relative flex-none text-sm text-center font-semibold text-white py-2.5 px-4 rounded-lg bg-slate-900 dark:bg-sky-500 dark:text-white focus:outline-none hover:bg-slate-700 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:highlight-white/20 dark:hover:bg-sky-400 dark:focus:ring-2 dark:focus:ring-sky-600 dark:focus:ring-offset-slate-900">
        儲存 cookie
      </button>
      <button @click.prevent="openToast"
        class="relative flex-none text-sm text-center font-semibold text-white py-2.5 px-4 rounded-lg bg-slate-900 dark:bg-sky-500 dark:text-white focus:outline-none hover:bg-slate-700 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:highlight-white/20 dark:hover:bg-sky-400 dark:focus:ring-2 dark:focus:ring-sky-600 dark:focus:ring-offset-slate-900">
        開啟吐司
      </button>
    </div>
    <h2 class="my-6 text-8 fw-700">商品列表</h2>
    <div class="grid grid-cols-3 gap-4">
      <div @click="toProject(item)" v-for="(item,index) in projectList" :key="index" class="rounded-xl cursor-pointer">
        <div class="flex flex-col w-full">
          <img class="mb-4" src="/test.webp" alt="">
          <p class="leading-5 mb-4">{{ item.title }}</p>
          <div class="flex">
            <p class="fw-700 text-6 mr-4">NT {{ item.discountPrice }}</p>
            <p class="self-center text-xs font-bold text-black bg-yellow-300 p-1"> {{ calculateDiscount(item.originalPrice, item.discountPrice)}} 折</p>
          </div>
        </div>
      </div>
    </div>
    <div>
      <Ckeditor v-model="ck"></Ckeditor>
      <h1>獲得環境:{{ env }}</h1>
      <span class="mdi mdi-account"></span>
      <Upload v-model="upload"></Upload>
      <img :src="upload" alt="">
    </div>
    <!-- 彈窗 -->
    <Modal v-model="demoModal" title="測試彈窗">
      <table class="w-full border-separate border border-slate-400 ...">
        <thead>
          <tr>
            <th class="border border-slate-300 ...">State</th>
            <th class="border border-slate-300 ...">City</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-slate-300 ...">Indiana</td>
            <td class="border border-slate-300 ...">Indianapolis</td>
          </tr>
          <tr>
            <td class="border border-slate-300 ...">Ohio</td>
            <td class="border border-slate-300 ...">Columbus</td>
          </tr>
          <tr>
            <td class="border border-slate-300 ...">Michigan</td>
            <td class="border border-slate-300 ...">Detroit</td>
          </tr>
        </tbody>
      </table>
      <div>
        <div class="flex">
          <label for="name">名稱</label>
          <input v-model="form.name" id="name" class="border-2 b-blue" type="text">
        </div>
        <div class="flex">
          <label for="content">內容</label>
          <input v-model="form.content" id="content" class="border-2 b-blue" type="text">
        </div>
        <div class="flex">
          <label for="comments">頻論數量</label>
          <input v-model="form.comments" id="comments" class="border-2 b-blue" type="text">
        </div>
        <button @click.prevent="submitForm">送出表單</button>
      </div>
    </Modal>
  </section>
</template>
