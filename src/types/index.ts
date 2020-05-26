export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  transformRequest?: AxiosTransformer | AxiosTransformer[]
  transformResponse?: AxiosTransformer | AxiosTransformer[]
  [propName: string]: any
}
export interface AxiosTransformer {
    (data: any, headers?: any): any
  }

export interface AxiosResponse {
  data: any,
  status: number,
  statusText: string,
  header: any,
  config: AxiosRequestConfig,
  request: any
}


export interface AxiosPromise extends Promise<AxiosResponse>{

}
