<script setup lang="ts">
import {
  type DialogContentEmits,
  type DialogContentProps,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  useForwardPropsEmits,
} from 'radix-vue'
import { type HTMLAttributes, computed } from 'vue'
import { IconSquareX } from '#/icons'
import { cn } from '#/utils'
import { type SheetVariants, sheetVariants } from '.'

interface SheetContentProps extends DialogContentProps {
  class?: HTMLAttributes['class']
  side?: SheetVariants['side']
}

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<SheetContentProps>()

const emits = defineEmits<DialogContentEmits>()

const delegatedProps = computed(() => {
  const { class: _class, side: _side, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DialogPortal>
    <DialogOverlay
      class="data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=open]:animate-in data-[state=closed]:animate-out fixed inset-0 z-50 bg-black/80"
    />
    <DialogContent
      :class="cn(sheetVariants({ side }), props.class)"
      v-bind="{ ...forwarded, ...$attrs }"
    >
      <slot></slot>

      <DialogClose
        class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity disabled:pointer-events-none data-[state=open]:bg-secondary hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring"
      >
        <IconSquareX class="h-4 w-4" />
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>
