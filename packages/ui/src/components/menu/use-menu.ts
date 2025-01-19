import type { ComputedRef, EffectScope, Reactive } from 'vue'
import type { MenuProps } from './types.ts'
import { computed, effectScope, onBeforeUnmount, reactive } from 'vue'

interface MenuState {
  isAccordion: ComputedRef<boolean>
  isCollapse: ComputedRef<boolean>
  levelOffsetCssVar: string
  menuCssVar: Reactive<Record<string, string>>
}

interface MenuContext extends MenuState {}

function createMenuScope<P extends MenuProps>() {
  let context: MenuContext | null = null
  let scope: EffectScope | null = null

  function createState(props: P) {
    const isAccordion = computed(() => props.accordion)
    const isCollapse = computed(() => props.collapse)

    /**
     * menu css vars
     */
    const menuCssVar = reactive({
      '--menu-level': '0',
      '--menu-level-padding': '24px',
      '--menu-padding': '8px',
    })

    /**
     * sub menu padding left css var
     */
    const levelOffset = 'var(--menu-level, 0) * var(--menu-level-padding)'
    const levelOffsetCssVar = `calc(var(--menu-padding) + ${levelOffset})`

    return {
      isAccordion,
      isCollapse,
      levelOffsetCssVar,
      menuCssVar,
    }
  }

  function createMenuContext(props: P) {
    const state = createState(props)

    /**
     * 创建 menu 上下文的组件，自动销毁 menu scope
     */
    onBeforeUnmount(() => {
      scope && scope.stop()
    })

    return state as MenuContext
  }

  return (props?: P): MenuContext => {
    if (!context) {
      if (!props) {
        throw new Error('[hook:useMenu] except type MenuProps')
      }
      scope = effectScope()
      context = scope.run(() => createMenuContext(props!))!
    }
    return context
  }
}

export const useMenu = createMenuScope<MenuProps>()
