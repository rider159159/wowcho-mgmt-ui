import axios, { AxiosRequestConfig } from 'axios'
import { GET_TOKEN } from '../cookie'
import { errorMsg } from '@/utils/msg'
import { requestStore } from '@/stores';

const defaultConfig = {
  timeout: 30000,
  // 判斷環境變數
  baseURL: import.meta.env.VITE_BASE_URL ? import.meta.env.VITE_BASE_URL : 'http://localhost:3034'
}
class ApiResponse {
  constructor(response: any) {
    return this.transformData(response);
  }

  transformData(data: any): any {
    if (data.hasOwnProperty('data')) {
      return {
        ...data,
        data: this.transformData(data.data),
      };
    }

    if (data.hasOwnProperty('list') && Array.isArray(data.list)) {
      return {
        ...data,
        list: data.list.map(this.transformObjectId),
      };
    }

    if (data.hasOwnProperty('_id')) {
      return this.transformObjectId(data);
    }

    return data;
  }

  transformObjectId(obj: any): any {
    const newObj: any = { ...obj };
    if (obj.hasOwnProperty('_id')) {
      newObj.id = obj._id;
      delete newObj._id;
    }
    return newObj;
  }
}

class Http {
  constructor(){
    this.httpInterceptorsRequest()
    this.httpInterceptorsResponse()
  }
  
  private static axiosInstance = axios.create(defaultConfig)

  private httpInterceptorsRequest() {
    // TODO: axios request 攔截器，API 統一設定可來此
    Http.axiosInstance.interceptors.request.use((config) => {
      const requestStoreInstance = requestStore();
      const { ADD_LOADING } = requestStoreInstance;

      const uuid = self.crypto.randomUUID();
      const abortControllerInstance = new AbortController();
      // uuid 唯一識別碼， isUnLoad 判斷
      const handleConfig:any = { ...config, uuid:uuid } 
      // handleConfig.uuid = uuid; // 建立請求唯一碼
      handleConfig.signal = abortControllerInstance.signal; // 建立abort 的方法
      // 是否要觸發全域 loading
      if (!handleConfig.isUnLoad) {
        ADD_LOADING({ id: handleConfig.uuid, cancel: abortControllerInstance }); // 丟進pinia裡面的config
      }
      // 是否要帶 JWT
      if (handleConfig.headers) {
        handleConfig.headers.Authorization = `Bearer ${GET_TOKEN()}`;
      }
      return handleConfig
    },error => {
      return Promise.reject(error)
    })
  }

  private httpInterceptorsResponse() {
    // TODO: axios response 攔截器，API 統一設定可來此
    // @ts-ignore
    Http.axiosInstance.interceptors.response.use((response:any) => {
      const requestStoreInstance = requestStore();
      // 移除 Loading
      const { REMOVE_TARGET_LOADING } = requestStoreInstance;
      REMOVE_TARGET_LOADING(response.config.uuid);
      // 狀態成功，會傳轉換 _id 的資料
      const { status } = response
      if ( status === 200  || status < 300 || status === 304 ) {
        return { data: new ApiResponse(response.data) }
      }
      errorMsg(response.data.message)
      // return new ApiResponse(response.data);
      return { data: new ApiResponse(response.data) }
    }, 
    (error) => {
      const requestStoreInstance = requestStore();
      const { REMOVE_TARGET_LOADING } = requestStoreInstance;
      const { response = {}, config } = error;
      REMOVE_TARGET_LOADING(config.uuid);
      errorMsg(error.response.data.message)
      return error.response
    })
  }

  // params = methods、 query 等等 axios 本身封裝，透過參數傳遞給 axios
  public httpGet<T>(url: string, params?: AxiosRequestConfig, isUnLoad?:boolean ):Promise<T> {
    const config = { ...params, isUnLoad};
    return Http.axiosInstance.get(url, config).then(res => res.data)
  }

  public httpPost<T>(url: string, data?: AxiosRequestConfig, isUnLoad?:boolean, params?: AxiosRequestConfig):Promise<T> {
    const config = { ...params, isUnLoad };
    return Http.axiosInstance.post(url,data, config).then(res => res.data)
  }

  public httpPut<T>(url: string, data?: AxiosRequestConfig, isUnLoad?:boolean, params?: AxiosRequestConfig):Promise<T> {
    const config = { ...params, isUnLoad };
    return Http.axiosInstance.put(url, data, config).then(res => res.data)
  }

  public httpPatch<T>(url: string, data?: AxiosRequestConfig, isUnLoad?:boolean, params?: AxiosRequestConfig):Promise<T> {
    const config = { ...params, isUnLoad };
    return Http.axiosInstance.patch(url, data, config).then(res => res.data)
  }
  public httpDelete<T>(url: string, data?: AxiosRequestConfig, isUnLoad?:boolean, params?: AxiosRequestConfig):Promise<T> {
    const config = { data, isUnLoad };
    return Http.axiosInstance.delete(url, config).then(res => res.data)
  }
}

export const http = new Http()
