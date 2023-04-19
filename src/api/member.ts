import { http } from '@/utils/axios'
import { ApiResponse } from '@/interface'

export const fetchMember = {
  getMemberInfo: (params?:any):Promise<ApiResponse> => http.httpGet('/api/memberInfo',{ params }),
}
