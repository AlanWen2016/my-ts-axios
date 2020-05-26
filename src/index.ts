import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from './types/index'
import xhr from './xhr'
import { bulidURL } from './helps/url'
import { transformRequest, transformResponse } from './helps/data'
import { processHeaders } from './helps/header'

function axios(config: AxiosRequestConfig): AxiosPromise{
    processConfig(config)
    return xhr(config).then(res =>{
      return transformResponseData(res)
    })
}


  function processConfig (config: AxiosRequestConfig): void {
    config.url = transformUrl(config)
    config.headers = transformHeaders(config)
    config.data = transformRequestData(config)
    console.log('config', config)

  }

  function transformUrl (config: AxiosRequestConfig): string {
    const { url, params } = config
    return bulidURL(url, params)
  }

  function transformRequestData(config: AxiosRequestConfig):string{
    const {data} = config
    return transformRequest(data)
  }

function transformHeaders (config: AxiosRequestConfig) {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}
export default axios
