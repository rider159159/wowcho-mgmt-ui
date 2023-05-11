import { http } from '@/utils/axios'
import { ApiResponse } from '@/interface'

export const fetchPlan = {
  // 新增
  create:(data?:any, isUnLoad?:boolean):Promise<ApiResponse> => http.httpPost('/plan',data, isUnLoad),
  // 更新
  update: (data?:any, isUnLoad?:boolean):Promise<ApiResponse> => http.httpPatch('/plan',data, isUnLoad),
  // 獲得單一詳細
  get: (params?:any, isUnLoad?:boolean):Promise<ApiResponse> => http.httpGet('/plan/details',{ params }, isUnLoad),
  // 獲得列表
  getList:(params?:any, isUnLoad?:boolean):Promise<ApiResponse> => http.httpGet('/plan',{ params }, isUnLoad),
  // 刪除
  delete:(data?:any, isUnLoad?:boolean):Promise<ApiResponse> => http.httpDelete('/plan',data, isUnLoad),
}

