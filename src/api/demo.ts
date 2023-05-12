import { http } from '@/utils/axios'
import { type ApiResponse } from '@/interface'

export const fetchDemo = {
  getPosts: async (params?: any, isUnLoad?: boolean): Promise<ApiResponse> => await http.httpGet('/posts', { params }, isUnLoad),
  createPosts: async (data?: any, isUnLoad?: boolean): Promise<ApiResponse> => await http.httpPost('/posts', data, isUnLoad),
  getMemberInfo: async (params?: any, isUnLoad?: boolean): Promise<ApiResponse> => await http.httpGet('/api/memberInfo', { params }, isUnLoad),
  getProjectAll: async (params?: any, isUnLoad?: boolean): Promise<ApiResponse> => await http.httpGet('/api/projectList', { params }, isUnLoad),
  deleteTest: async (data?: any, isUnLoad?: boolean): Promise<ApiResponse> => await http.httpDelete('/api/memberInfo', data, isUnLoad)

}
