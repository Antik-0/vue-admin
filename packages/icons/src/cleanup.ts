import { promises as fs } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'
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

function createPath(path: string, base = import.meta.url) {
  return fileURLToPath(new URL(path, base))
}

async function makeDir(path: string) {
  try {
    await fs.access(path)
  } catch {
    await fs.mkdir(path)
  }
}

/** paths */
const rootPath = createPath('../')
const distDirPath = resolve(rootPath, 'dist')
const svgsDirPath = resolve(rootPath, './src/svgs')
const SVGOConfigPath = resolve(rootPath, 'svgo.config.js')

const outputPaths = {
  css: resolve(distDirPath, 'icons.css'),
  icons: resolve(distDirPath, 'icons.json'),
  info: resolve(distDirPath, 'info.json'),
}

const ICONSET_PREFIX = 'svg'

/** building flow */
try {
  console.log('✨ IconSet building ... ✨\n')

  await makeDir(distDirPath)
  await optimizeBySVGO()
  const iconSet = await buildIconSet()
  const isValidIconSet = await exportProcess(iconSet)

  console.log(`🎉 IconSet Pass The Validity Check: ${isValidIconSet}`)

  console.log(`🎉 Saved [icons.json] success: ${outputPaths.icons}`)
  console.log(`🎉 Saved [info.json] success: ${outputPaths.info}`)
  console.log(`🎉 Saved [icons.css] success: ${outputPaths.css}`)
} catch (error) {
  console.log('⚠️ IconiFy icons building fail: ', error)
} finally {
  console.log('\n')
}

async function optimizeBySVGO() {
  const config = await loadConfig(SVGOConfigPath)
  const result: Record<'data' | 'name', string>[] = []

  const svgFileList = await fs.readdir(svgsDirPath)
  for (const filename of svgFileList) {
    const svgData = await fs.readFile(resolve(svgsDirPath, filename), 'utf-8')
    result.push({
      name: filename,
      data: optimize(svgData, config).data,
    })
  }

  for (const { name, data } of result) {
    const filePath = resolve(svgsDirPath, name)
    await fs.writeFile(filePath, data, 'utf-8')
  }
}

async function buildIconSet() {
  const result = blankIconSet(ICONSET_PREFIX)

  const iconSet = await importDirectory(svgsDirPath)
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

  const isValid = quicklyValidateIconSet(iconSetJSON) !== null

  // export to `./svgs/*.svg`
  await exportToDirectory(iconSet, {
    log: false,
    target: svgsDirPath,
  })

  // export to `../dist/icons.json`
  await fs.writeFile(
    outputPaths.icons,
    JSON.stringify(iconSetJSON, null, '\t'),
    'utf-8'
  )

  // export to `../dist/info.json`
  const iconsInfo = {
    name: prefix,
    author: { name: prefix },
    license: { title: 'MIT' },
    total: iconSet.count(),
  }
  await fs.writeFile(
    outputPaths.info,
    JSON.stringify(iconsInfo, null, '\t'),
    'utf-8'
  )

  // export to `../dist/icons.css`
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
  await fs.writeFile(outputPaths.css, cssCode, 'utf8')

  return isValid
}
