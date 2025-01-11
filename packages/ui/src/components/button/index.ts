import type { ButtonVariants } from '#/shadcn-ui/button'
import type { HTMLAttributes } from 'vue'

export interface ButtonProps {
  class?: HTMLAttributes['class']
  disabled?: boolean
  loading?: boolean
  size?: ButtonVariants['size']
  variant?: ButtonVariants['variant']
}

export { default as Button } from './Button.vue'
export { default as IconButton } from './IconButton.vue'
