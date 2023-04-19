import { http } from '@/utils/axios'
import { ApiResponse } from '@/interface'

export const fetchPost = {
  getPosts: (params?:any):Promise<ApiResponse> => http.httpGet('/posts',{ params }),
  createPosts: (data?:any):Promise<ApiResponse> => http.httpPost('/posts',data)
}
