import { http } from '@/utils/axios'
import { type ApiResponse } from '@/interface'

export const fetchSponsor = {
  // 獲得單一詳細
  get: async (params?: any, isUnLoad?: boolean): Promise<ApiResponse> => await http.httpGet('/sponsor/details', { params }, isUnLoad),
  // 獲得列表
  getList: async (params?: any, isUnLoad?: boolean): Promise<ApiResponse> => await http.httpGet('/sponsor', { params }, isUnLoad)
}
