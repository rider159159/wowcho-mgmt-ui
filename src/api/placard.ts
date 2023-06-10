import { http } from '@/utils/axios'
import { type ApiResponse } from '@/interface'

export const fetchPlacard = {
  // 新增
  create: async (data?: any, isUnLoad?: boolean): Promise<ApiResponse> => await http.httpPost('/placard', data, isUnLoad),
  // 更新
  update: async (data?: any, isUnLoad?: boolean): Promise<ApiResponse> => await http.httpPatch('/placard', data, isUnLoad),
  // 獲得單一詳細
  get: async (params?: any, isUnLoad?: boolean): Promise<ApiResponse> => await http.httpGet('/placard/details', { params }, isUnLoad),
  // 獲得列表
  getList: async (params?: any, isUnLoad?: boolean): Promise<ApiResponse> => await http.httpGet('/placard', { params }, isUnLoad),
  // 刪除
  delete: async (data?: any, isUnLoad?: boolean): Promise<ApiResponse> => await http.httpDelete('/placard', data, isUnLoad)
}
