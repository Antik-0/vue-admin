import fs from 'node:fs/promises'
import { resolve } from 'node:path'
import {
  blankIconSet,
  cleanupSVG,
  exportToDirectory,
  IconSet,
  importDirectory,
  parseColors,
  runSVGO,
} from '@iconify/tools'
import { getIconsCSS, quicklyValidateIconSet } from '@iconify/utils'
import { loadConfig, optimize } from 'svgo'

const DIST_ICON_JSON = 'icons.json'
const DIST_INFO_JSON = 'info.json'
const DIST_ICON_CSS = 'icons.css'
const ICON_PREFIX = 'svg'

const __dirname__ = import.meta.dirname

function r(...path: string[]) {
  return resolve(__dirname__, ...path)
}

async function makeDir(path: string) {
  try {
    await fs.access(path)
  } catch {
    await fs.mkdir(path)
  }
}

/** paths */
const SVGOConfigPath = r('../svgo.config.js')
const dirSvgs = r('./svgs')
const dirDist = r('../dist')

let isValidIconSet = false

/** building flow */
try {
  console.log('✨ IconSet building ... ✨\n')

  await makeDir(dirDist)
  await optimizeBySVGO()
  const iconSet = await buildIconSet()
  await exportProcess(iconSet)

  console.log(`🎉 IconSet Pass The Validity Check: ${isValidIconSet}`)

  const pathIconifyJSON = r(dirDist, DIST_ICON_JSON)
  const pathIconifyInfoJSON = r(dirDist, DIST_INFO_JSON)
  const pathIconifyCSS = r(dirDist, 'icons.css')
  console.log(`🎉 Saved [icons.json] success: ${pathIconifyJSON}`)
  console.log(`🎉 Saved [info.json] success: ${pathIconifyInfoJSON}`)
  console.log(`🎉 Saved [icons.css] success: ${pathIconifyCSS}`)
} catch (error) {
  console.log('⚠️ IconiFy icons building fail: ', error)
} finally {
  console.log('\n')
}

async function optimizeBySVGO() {
  const config = await loadConfig(SVGOConfigPath)
  const result: Record<'data' | 'name', string>[] = []

  const svgFileList = await fs.readdir(dirSvgs)
  for (const filename of svgFileList) {
    const svgData = await fs.readFile(r(dirSvgs, filename), 'utf-8')
    result.push({
      name: filename,
      data: optimize(svgData, config).data,
    })
  }

  for (const { name, data } of result) {
    const filePath = r(dirSvgs, name)
    await fs.writeFile(filePath, data, 'utf-8')
  }
}

async function buildIconSet() {
  const result = blankIconSet(ICON_PREFIX)

  const iconSet = await importDirectory(dirSvgs)
  iconSet.forEach(name => {
    const svg = iconSet.toSVG(name)
    if (!svg) return

    try {
      cleanupSVG(svg, { keepTitles: false })
      parseColors(svg, { defaultColor: 'currentColor' })
      runSVGO(svg, { keepShapes: true, multipass: true })
    } catch (error) {
      console.warn(`❗Error cleanup ${name}.svg: ${error}`)
    }

    result.fromSVG(name, svg)
  })

  return result
}

async function exportProcess(iconSet: IconSet) {
  const prefix = iconSet.prefix
  const iconSetJSON = iconSet.export()

  isValidIconSet = quicklyValidateIconSet(iconSetJSON) !== null

  // export to ./svgs/*.svg
  await exportToDirectory(iconSet, {
    log: false,
    target: dirSvgs,
  })

  // export to ../dist/icons.json
  const IconifyJSONPath = r(dirDist, DIST_ICON_JSON)
  await fs.writeFile(
    IconifyJSONPath,
    JSON.stringify(iconSetJSON, null, '\t'),
    'utf-8'
  )

  // export to ../dist/info.json
  const iconsInfo = {
    name: prefix,
    author: { name: prefix },
    license: { title: 'MIT' },
    total: iconSet.count(),
  }
  const pathIconifyInfoJSON = r(dirDist, DIST_INFO_JSON)
  await fs.writeFile(
    pathIconifyInfoJSON,
    JSON.stringify(iconsInfo, null, '\t'),
    'utf-8'
  )

  // export to ../dist/icons.css
  const iconSetNames = iconSet.list()
  const cssCode = getIconsCSS(iconSetJSON, iconSetNames, {
    commonSelector: '.svg',
    forceSquare: false,
    format: 'expanded',
    iconSelector: '.{prefix}\\:{name}',
    rules: {
      'line-height': 'inherit',
      'vertical-align': 'middle',
    },
    varName: 'svg',
  })
  const pathIconifyCSS = r(dirDist, DIST_ICON_CSS)
  await fs.writeFile(pathIconifyCSS, cssCode, 'utf8')
}
