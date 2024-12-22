import type { MakeErrorMessageFn } from './types.ts'

import { errorMessageResponseInterceptor } from './modules/preset-interceptors.ts'
import { RequestClient } from './request.ts'

const baseURL = 'http://localhost:3000'

function createRequestClient(baseURL: string) {
  const client = new RequestClient({ baseURL })

  const formatToken = (token: string | null) => {
    return token ? `Bearer ${token}` : null
  }

  const makeErrorMessage: MakeErrorMessageFn = message => {
    console.log('makeErrorMessage', message)
  }

  // 请求拦截 - 设置 token
  client.addRequestInterceptor({
    fulfilled: config => {
      config.headers.set('Authorization', formatToken('token'))
      config.headers.set('Accept-Language', 'zh-cn')
      return config
    },
  })

  // 响应拦截-成功处理: 条件过滤
  client.addResponsetInterceptor({
    fulfilled: response => {
      const { data: responseData, status } = response

      const { code, data } = responseData
      if (status >= 200 && status < 400 && code === 0) {
        // 这里最好还是返回 responseData， 返回多一点信息，然后让上层通过{data}来处理
        return data
      }

      // 转到错误回调
      return Promise.reject(response)
    },
  })

  // 响应拦截-错误处理: 自定义错误码处理
  client.addResponsetInterceptor({
    rejected: error => {
      // 获取后端错误提示
      const message = (error as any)?.data?.msg
      if (message) {
        makeErrorMessage(message)

        // 标记: 错误已经处理了
        error.__error_been_handled__ = true
      }

      return Promise.reject(error)
    },
  })

  // 响应拦截-错误处理: http标准错误码处理
  client.addResponsetInterceptor(
    errorMessageResponseInterceptor(makeErrorMessage)
  )

  return client
}

export const requestClient = createRequestClient(baseURL)

export const baseRequestClient = new RequestClient({ baseURL })
