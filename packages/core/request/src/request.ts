import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
} from './types.ts'

import axios from 'axios'
import { FileDownloader } from './modules/download.ts'
import { InterceptorManager } from './modules/interceptor.ts'
import { FileUploader } from './modules/upload.ts'

class RequestClient {
  private readonly instance: AxiosInstance

  public isRefreshing = false
  public refreshTokenQueue: ((token: string) => void)[] = []

  // Interceptor Manager
  public addRequestInterceptor: InterceptorManager['addRequestInterceptor']
  public addResponsetInterceptor: InterceptorManager['addResponseInterceptor']

  // File Loader
  public download: FileDownloader['download']
  public upload: FileUploader['upload']

  /**
   * 构造函数，用于创建Axios实例
   * @param options - Axios请求配置，可选
   */
  constructor(options: CreateAxiosDefaults) {
    // 合并默认配置和传入的配置
    const defaultConfig: CreateAxiosDefaults = {
      headers: {
        'Content-Type': 'multipart/form-data;charset=utf-8',
      },
      timeout: 10_000,
    }
    const { ...axiosConfig } = options
    const requestConfig = { ...defaultConfig, ...axiosConfig }
    this.instance = axios.create(requestConfig)

    // 绑定拦截器管理器
    const interceptorManager = new InterceptorManager(this.instance)
    this.addRequestInterceptor =
      interceptorManager.addRequestInterceptor.bind(interceptorManager)
    this.addResponsetInterceptor =
      interceptorManager.addResponseInterceptor.bind(interceptorManager)

    // 绑定文件上传器
    const fileUploader = new FileUploader(this)
    this.upload = fileUploader.upload.bind(fileUploader)
    // 绑定文件下载器
    const fileDownloader = new FileDownloader(this)
    this.download = fileDownloader.download.bind(fileDownloader)

    this.bindMethods()
  }

  bindMethods() {
    const propertyNames = Object.getOwnPropertyNames(
      Reflect.getPrototypeOf(this)
    )
    propertyNames.forEach(propertyName => {
      const propertyValue = (this as any)[propertyName]
      if (
        typeof propertyValue === 'function' &&
        propertyName !== 'constructor'
      ) {
        ;(this as any)[propertyName] = propertyValue.bind(this)
      }
    })
  }

  /**
   * GET 请求方法
   */
  public get<T>(url: string, config?: AxiosRequestConfig) {
    return this.request<T>(url, { ...config, method: 'GET' })
  }

  /**
   * POST 请求方法
   */
  public post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.request<T>(url, { ...config, data, method: 'POST' })
  }

  /**
   * 通用请求方法
   */
  public async request<T>(url: string, config: AxiosRequestConfig) {
    try {
      const response: AxiosResponse<T> = await this.instance({
        url,
        ...config,
      })
      return response as T
    } catch (error: any) {
      throw error.response ? error.response.data : error
    }
  }
}

export { RequestClient }
