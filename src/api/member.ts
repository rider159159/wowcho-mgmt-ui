import { http } from '@/utils/axios'
import { ApiResponse } from '@/interface'

export const fetchMember = {
  // 註冊
  register:(data?:any, isUnLoad?:boolean):Promise<ApiResponse> => http.httpPost('/register',data ,isUnLoad),
  // 登入
  login: (data?:any, isUnLoad?:boolean):Promise<ApiResponse> => http.httpPost('/login',data, isUnLoad),
  // 取得帳戶資料
  getProfile: (params?:any, isUnLoad?:boolean):Promise<ApiResponse> => http.httpGet('/profile',{ params } ,isUnLoad),
  // 更新帳戶資料
  editProfile: (data?:any, isUnLoad?:boolean):Promise<ApiResponse> => http.httpPatch('/profile',data, isUnLoad),
}

