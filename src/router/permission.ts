// TODO: 路由守衛
import { Router } from 'vue-router'
import { GET_TOKEN } from '@/utils';

const permission = (router:Router) => {
  router.beforeEach(async (to) => {
    const USER_TOKEN = GET_TOKEN();
    // 前往頁面有權限
    if (to.meta.requiresAuth) {
      // 未登入進入權限頁面
      if(!USER_TOKEN){
        // 登出並進入登入頁
        return '/login';
      }
      // 驗證登入 API
      return true
    }
  })
};

export default permission;
