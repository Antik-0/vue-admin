import type { RequestClient } from '../request.ts'
import type { AxiosRequestConfig, AxiosResponse } from '../types.ts'

class FileDownloader {
  private client: RequestClient

  constructor(client: RequestClient) {
    this.client = client
  }

  public async download(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Blob>> {
    const finalConfig: AxiosRequestConfig = {
      ...config,
      responseType: 'blob',
    }

    const response = await this.client.get<AxiosResponse<Blob>>(
      url,
      finalConfig
    )

    return response
  }
}

export { FileDownloader }
