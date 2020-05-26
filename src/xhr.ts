import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from './types/index'
import { parseHeaders } from './helps/header'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {

  return new Promise((resolve, reject)=> {
    const {data = null, method= 'get', url, headers, responseType, timeout} = config
    const request = new XMLHttpRequest()
    if(responseType) {
      request.responseType = responseType
    }
    request.open(method.toUpperCase(), url, true)
    request.onreadystatechange = function handleLoad() {
      if(request.readyState !==  4) return
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData = responseType && responseType !== 'text' ? request.responseType : request.responseText
      const response: AxiosResponse ={
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        header: responseHeaders,
        config,
        request
      }
      // resolve(response)
      handleResponse(response)
    }

    if (timeout) {
      request.timeout = timeout
    }
    request.ontimeout = function handleTimeout() {
      reject(new Error(`Timeout of ${timeout} ms exceeded`))
    }
    request.onerror = function handleError() {
      reject(new Error('Network Error'))
    }

    function handleResponse(response: AxiosResponse) {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(new Error(`Request failed with status code ${response.status}`))
      }
    }
    // 设置请求头
    Object.keys(headers).forEach(name=>{
      if(data === null && name.toLowerCase() === 'content-type'){
        delete headers[name]
      }else{
        request.setRequestHeader(name, headers[name])
      }
    })
    request.send(data)

  })
}



