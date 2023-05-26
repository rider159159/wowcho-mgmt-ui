import { type ApiResponse } from "@/interface"
import { http } from "@/utils/axios"

export const fetchBusinessProfile = {
  // 取得商業檔案
  get: async (params?: any, isUnLoad?: boolean): Promise<ApiResponse> => await http.httpGet('/business-profile', params, isUnLoad),
  // 更新商業檔案
  update: async (params?: any, isUnLoad?: boolean): Promise<ApiResponse> => await http.httpPatch('/business-profile', params, isUnLoad)
}