import { type ApiResponse } from '@/interface'
import { http } from '@/utils/axios'

export const fetchDashboard = {
  // 取得後臺控制中心資料
  get: async (params?: any, isUnLoad?: boolean): Promise<ApiResponse> => await http.httpGet('/dashboard', { params }, isUnLoad)
}
