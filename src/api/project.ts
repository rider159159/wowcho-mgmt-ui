import { http } from '../utils/AxiosInstance'

const api = {
  // typeScript 設定必帶參數，1 網址、2 Axios 相關 header
  getProjectAll: (params?:any) => http.httpGet('/api/projectList',{ params }),
}

export default api