import { http } from '@/utils/axios'
import { ApiResponse } from '@/interface'

export const fetchProject = {
  getProjectAll: (params?:any):Promise<ApiResponse> => http.httpGet('/api/projectList',{ params }),
}