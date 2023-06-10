import { http } from '@/utils/axios'
import { type ApiResponse } from '@/interface'

export const fetchFaq = {
  // 新增
  create: async (data?: any, isUnLoad?: boolean): Promise<ApiResponse> => await http.httpPost('/faq', data, isUnLoad),
  // 更新
  update: async (data?: any, isUnLoad?: boolean): Promise<ApiResponse> => await http.httpPatch('/faq', data, isUnLoad),
  // 獲得單一詳細
  get: async (params?: any, isUnLoad?: boolean): Promise<ApiResponse> => await http.httpGet('/faq/details', { params }, isUnLoad),
  // 獲得列表
  getList: async (params?: any, isUnLoad?: boolean): Promise<ApiResponse> => await http.httpGet('/faq', { params }, isUnLoad),
  // 刪除
  delete: async (data?: any, isUnLoad?: boolean): Promise<ApiResponse> => await http.httpDelete('/faq', data, isUnLoad)
}
