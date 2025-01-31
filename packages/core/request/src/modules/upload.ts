import type { AxiosRequestConfig, AxiosResponse } from '../types.ts'

import { RequestClient } from '../request.ts'

class FileUploader {
  private client: RequestClient

  constructor(client: RequestClient) {
    this.client = client
  }

  public async upload(
    url: string,
    file: Blob | File,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    const formData = new FormData()
    formData.append('file', file)

    const finalConfig: AxiosRequestConfig = {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...config?.headers,
      },
    }

    return this.client.post(url, formData, finalConfig)
  }
}

export { FileUploader }
