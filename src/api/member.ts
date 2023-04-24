import { http } from '@/utils/axios'
import { ApiResponse } from '@/interface'

export const fetchMember = {
  // 註冊
  register:(data?:any):Promise<ApiResponse> => http.httpPost('/register',data),
  // 登入
  login: (data?:any):Promise<ApiResponse> => http.httpPost('/login',data),
  // 取得帳戶資料
  getProfile: (params?:any):Promise<ApiResponse> => http.httpGet('/profile',{ params }),
  // 更新帳戶資料
  editProfile: (data?:any):Promise<ApiResponse> => http.httpPost('/profile',data),
}

