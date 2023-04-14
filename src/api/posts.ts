import { http } from '../utils/AxiosInstance'

const api = {
  // typeScript 設定必帶參數，1 網址、2 Axios 相關 header
  getPosts: (params?:any) => http.httpGet('/posts',{ params }),
  createPosts: (data?:any) => http.httpPost('/posts',data),
}

export default api