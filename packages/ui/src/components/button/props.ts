import type { ButtonVariants } from '#/shadcn-ui'
import type { HTMLAttributes } from 'vue'

export interface ButtonProps {
  class?: HTMLAttributes['class']
  disabled?: boolean
  loading?: boolean
  size?: ButtonVariants['size']
  variant?: ButtonVariants['variant']
}
