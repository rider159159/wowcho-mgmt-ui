import { http } from '@/utils/axios'
import { type ApiResponse } from '@/interface'

export const fetchMember = {
  // 第三方登入
  oauthLogin: (data?:any, isUnLoad?: boolean):Promise<ApiResponse> => http.httpPost('/login/oauth', data, isUnLoad),
  // 註冊
  register: async (data?: any, isUnLoad?: boolean): Promise<ApiResponse> => await http.httpPost('/register', data, isUnLoad),
  // 登入
  login: async (data?: any, isUnLoad?: boolean): Promise<ApiResponse> => await http.httpPost('/login', data, isUnLoad),
  // 取得帳戶資料
  getProfile: async (params?: any, isUnLoad?: boolean): Promise<ApiResponse> => await http.httpGet('/profile', { params }, isUnLoad),
  // 更新帳戶資料
  editProfile: async (data?: any, isUnLoad?: boolean): Promise<ApiResponse> => await http.httpPatch('/profile', data, isUnLoad)
}
