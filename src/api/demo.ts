import { http } from '@/utils/axios'
import { ApiResponse } from '@/interface'

export const fetchDemo = {
  getPosts: (params?:any):Promise<ApiResponse> => http.httpGet('/posts',{ params }),
  createPosts: (data?:any):Promise<ApiResponse> => http.httpPost('/posts',data),
  getMemberInfo: (params?:any):Promise<ApiResponse> => http.httpGet('/api/memberInfo',{ params }),
  getProjectAll: (params?:any):Promise<ApiResponse> => http.httpGet('/api/projectList',{ params }),
}
