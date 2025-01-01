export { default as IconArrowLeftRight } from './components/IconArrowLeftRight.vue'
export { default as IconArrowLeftToLine } from './components/IconArrowLeftToLine.vue'
export { default as IconArrowRightToLine } from './components/IconArrowRightToLine.vue'
export { default as IconBell } from './components/IconBell.vue'
export { default as IconCheck } from './components/IconCheck.vue'
export { default as IconChevronDown } from './components/IconChevronDown.vue'
export { default as IconChevronRight } from './components/IconChevronRight.vue'
export { default as IconChevronsLeft } from './components/IconChevronsLeft.vue'
export { default as IconChevronsRight } from './components/IconChevronsRight.vue'
export { default as IconCircle } from './components/IconCircle.vue'
export { default as IconCircleHelp } from './components/IconCircleHelp.vue'
export { default as IconExternalLink } from './components/IconExternalLink.vue'
export { default as IconFoldHorizontal } from './components/IconFoldHorizontal.vue'
export { default as IconFullscreen } from './components/IconFullscreen.vue'
export { default as IconLanguages } from './components/IconLanguages.vue'
export { default as IconLoaderCircle } from './components/IconLoaderCircle.vue'
export { default as IconLockKeyhole } from './components/IconLockKeyhole.vue'
export { default as IconLogOut } from './components/IconLogOut.vue'
export { default as IconMaximize } from './components/IconMaximize.vue'
export { default as IconMenu } from './components/IconMenu.vue'
export { default as IconMinimize2 } from './components/IconMinimize2.vue'
export { default as IconMinimize } from './components/IconMinimize.vue'
export { default as IconMoreHorizontal } from './components/IconMoreHorizontal.vue'
export { default as IconPin } from './components/IconPin.vue'
export { default as IconPinOff } from './components/IconPinOff.vue'
export { default as IconRotateCw } from './components/IconRotateCw.vue'
export { default as IconSettings } from './components/IconSettings.vue'
export { default as IconX } from './components/IconX.vue'

import { createIcon } from './create-icon.js'

const LogoVue = createIcon('logos:vue')
const LogoReact = createIcon('logos:react')
const LogoGithub = createIcon('logos:github-icon')
const LogoVite = createIcon('logos:vitejs')
const LogoPinia = createIcon('logos:pinia')

export { LogoGithub, LogoPinia, LogoReact, LogoVite, LogoVue }
