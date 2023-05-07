import { http } from '@/utils/axios'
import { ApiResponse } from '@/interface'

export const fetchUpload = {
  upload: (data?:any, isUnLoad?:boolean):Promise<ApiResponse> => http.httpPost('/upload',data, isUnLoad),
}