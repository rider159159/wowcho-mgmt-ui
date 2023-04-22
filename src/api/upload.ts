import { http } from '@/utils/axios'
import { ApiResponse } from '@/interface'

export const fetchUpload = {
  upload: (data?:any):Promise<ApiResponse> => http.httpPost('/upload',data),
}