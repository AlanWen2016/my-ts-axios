import {AxiosRequestConfig} from './types/index'

export default function xhr(config: AxiosRequestConfig) {
    const {data = null, method= 'get', url} = config
    const request = new XMLHttpRequest()
    request.open(method.toUpperCase(), url, true)
    request.send(data)
}