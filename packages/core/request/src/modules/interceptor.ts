import type {
  AxiosInstance,
  RequestInterceptorConfig,
  ResponseInterceptorConfig,
} from '../types.ts'

const defaultRequestInterceptorConfig: RequestInterceptorConfig = {
  fulfilled: config => config,
  rejected: error => Promise.reject(error),
}

const defaultResponseInterceptorConfig: ResponseInterceptorConfig = {
  fulfilled: response => response,
  rejected: error => Promise.reject(error),
}

class InterceptorManager {
  private axiosInstance: AxiosInstance

  constructor(instance: AxiosInstance) {
    this.axiosInstance = instance
  }

  addRequestInterceptor({
    fulfilled,
    rejected,
  }: RequestInterceptorConfig = defaultRequestInterceptorConfig) {
    this.axiosInstance.interceptors.request.use(fulfilled, rejected)
  }

  addResponseInterceptor({
    fulfilled,
    rejected,
  }: ResponseInterceptorConfig = defaultResponseInterceptorConfig) {
    this.axiosInstance.interceptors.response.use(fulfilled, rejected)
  }
}

export { InterceptorManager }
