// TODO: 路由守衛
import { type Router } from 'vue-router'
import { GET_TOKEN } from '@/utils'
import { fetchMember } from '@/api'
import { userInfoStore } from '@/stores'

// 白名單
const whiteList = ['/signup', '/login', '/demo']
const permission = (router: Router) => {
  const USER_STORE = userInfoStore()
  router.beforeEach(async (to) => {
    // 確認前往的是在白名單，若是直接通過，不是的則需驗證
    if (whiteList.includes(to.path)) {
      return true
    }
    const USER_TOKEN = GET_TOKEN()
    // 驗證 Token 若無則回到登入頁面
    if (!USER_TOKEN) {
      USER_STORE.FN_LOGOUT()
      return '/login'
    }

    // 實例化 pinia 的儲存庫 準備取得使用者資料並存入
    // 取得使用者的令牌 (確認是否有效)
    const res = await fetchMember.getProfile()
    // 若有錯誤回登入頁，並清除資料、登出
    if (res.status !== 'Success') {
      USER_STORE.FN_LOGOUT()
      return '/login'
    }
    // 儲存使用者資料
    USER_STORE.USER_INFO_REF = res.data
    // 驗證成功通過
    return true
  })
}

export default permission
