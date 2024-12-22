import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from 'axios'

interface HttpResponse<T = any> {
  code: number
  data: T
  message: string
}

type ReponseInterceptorError = {
  __error_been_handled__?: boolean
} & AxiosError

interface RequestInterceptorConfig {
  fulfilled?: (
    config: InternalAxiosRequestConfig<any>
  ) =>
    | InternalAxiosRequestConfig<any>
    | Promise<InternalAxiosRequestConfig<any>>
  rejected?: (error: AxiosError<any>) => any
}

interface ResponseInterceptorConfig {
  fulfilled?: (
    response: AxiosResponse<HttpResponse>
  ) => AxiosResponse<HttpResponse> | Promise<AxiosResponse<HttpResponse>>
  rejected?: (error: ReponseInterceptorError) => any
}

type MakeErrorMessageFn = (message: string) => void

export type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
  HttpResponse,
  MakeErrorMessageFn,
  RequestInterceptorConfig,
  ResponseInterceptorConfig,
}
