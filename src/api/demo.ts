import { http } from '@/utils/axios'
import { ApiResponse } from '@/interface'

export const fetchDemo = {
  getPosts: (params?:any , isUnLoad?:boolean):Promise<ApiResponse> => http.httpGet('/posts',{ params }, isUnLoad),
  createPosts: (data?:any, isUnLoad?:boolean):Promise<ApiResponse> => http.httpPost('/posts',data, isUnLoad),
  getMemberInfo: (params?:any, isUnLoad?:boolean):Promise<ApiResponse> => http.httpGet('/api/memberInfo',{ params }, isUnLoad),
  getProjectAll: (params?:any, isUnLoad?:boolean):Promise<ApiResponse> => http.httpGet('/api/projectList',{ params }, isUnLoad),
  deleteTest: (data?:any, isUnLoad?:boolean):Promise<ApiResponse> => http.httpDelete('/api/memberInfo',data, isUnLoad),

}
