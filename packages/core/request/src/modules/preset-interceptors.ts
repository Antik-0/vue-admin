import type { MakeErrorMessageFn, ResponseInterceptorConfig } from '../types.ts'

function errorMessageResponseInterceptor(
  makeErrorMessage?: MakeErrorMessageFn
): ResponseInterceptorConfig {
  return {
    rejected: error => {
      // 错误已经被前面的拦截器处理了
      if (error.__error_been_handled__) {
        return Promise.reject(error)
      }

      let fallbackMessage = ''
      const httpMessage = error.message ?? ''

      if (httpMessage.includes('Network Error')) {
        fallbackMessage = 'fallback.http.networkError'
      } else if (httpMessage.includes('timeout')) {
        fallbackMessage = 'fallback.http.requestTimeout'
      }

      if (fallbackMessage) {
        makeErrorMessage?.(fallbackMessage)
        return Promise.reject(error)
      }

      const { status, statusText } = error.response!
      switch (status) {
        case 400:
          fallbackMessage = 'fallback.http.badRequest'
          break
        case 401:
          fallbackMessage = 'fallback.http.unauthorized'
          break
        case 403:
          fallbackMessage = 'fallback.http.forbidden'
          break
        case 404:
          fallbackMessage = 'fallback.http.notFound'
          break
        case 408:
          fallbackMessage = 'fallback.http.requestTimeout'
          break
        case 500:
          fallbackMessage = 'fallback.http.serverError'
          break
        default:
          fallbackMessage = statusText
          break
      }
      makeErrorMessage?.(fallbackMessage)
      return Promise.reject(error)
    },
  }
}

export { errorMessageResponseInterceptor }
