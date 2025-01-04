import { readFileSync } from 'node:fs'
import path from 'node:path'

const msgPath = path.resolve('.git/COMMIT_EDITMSG')
const msg = readFileSync(msgPath, 'utf-8').trim()

const commitRE =
  /^(revert: )?(feat|fix|docs|style|refactor|perf|test|chore|types)(\(.+\))?: .{1,50}/

if (!commitRE.test(msg)) {
  console.log(
    ` ERROR: invalid commit message format.
      提交信息：${msg}
      正则规范：${commitRE}
    `
  )
  process.exit(1)
}
