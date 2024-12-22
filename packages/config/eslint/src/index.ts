import type { Linter } from 'eslint'

import {
  command,
  ignores,
  javascript,
  jsonc,
  perfectionist,
  prettier,
  turbo,
  typescript,
  unocss,
  vue,
} from './plugins/index.js'

type FlatConfig = Linter.Config

export async function defineConfig(configs: FlatConfig | FlatConfig[] = []) {
  // 这种包模式部分插件需要异步导入才能使用，如果所有配置都在根目录下的config.js文件下引入则不需要
  const _configs = await Promise.all([
    command(),
    turbo(),
    jsonc(),
    javascript(),
    typescript(),
    unocss(),
    vue(),
    perfectionist(),
    prettier(),
    ignores(),
    configs,
  ])

  return _configs.flat()
}
