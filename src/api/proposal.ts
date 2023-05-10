import { http } from '@/utils/axios'
import { ApiResponse } from '@/interface'

export const fetchProposal = {
  // 新增
  create:(data?:any, isUnLoad?:boolean):Promise<ApiResponse> => http.httpPost('/proposal',data, isUnLoad),
  // 更新
  update: (data?:any, isUnLoad?:boolean):Promise<ApiResponse> => http.httpPatch('/proposal/details',data, isUnLoad),
  // 獲得單一詳細
  get: (params?:any, isUnLoad?:boolean):Promise<ApiResponse> => http.httpGet('/proposal/details',{ params }, isUnLoad),
  // 獲得列表
  getList:(params?:any, isUnLoad?:boolean):Promise<ApiResponse> => http.httpGet('/proposal',{ params }, isUnLoad),
  // 刪除
  delete:(data?:any, isUnLoad?:boolean):Promise<ApiResponse> => http.httpDelete('/proposal',data, isUnLoad),
}

