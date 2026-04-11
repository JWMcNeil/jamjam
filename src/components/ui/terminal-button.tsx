import { terminalStyleShellClass, TerminalStyleContent } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

const terminalButtonVariants = cva(terminalStyleShellClass, {
  defaultVariants: {
    size: 'md',
    variant: 'outline',
  },
  variants: {
    size: {
      lg: 'min-h-10 px-4 py-2.5 text-base',
      md: 'min-h-9 px-3 py-2 text-sm',
      sm: 'min-h-8 px-2.5 py-1.5 text-xs',
    },
    variant: {
      'accent-bracket': 'border border-border bg-page text-text-heading hover:bg-card',
      'accent-prompt': 'border border-border bg-page text-text-heading hover:bg-card',
      inverse: 'border border-border-subtle bg-page text-text-heading hover:bg-card',
      outline: 'border border-border bg-page text-text-heading hover:bg-card',
      solid: 'border border-border bg-grey-100 text-text-heading hover:bg-grey-150',
    },
  },
})

export type TerminalButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> &
  VariantProps<typeof terminalButtonVariants> & {
    asChild?: boolean
    children: React.ReactNode
    ref?: React.Ref<HTMLButtonElement>
    showArrow?: boolean
    showPrompt?: boolean
  }

const TerminalButton: React.FC<TerminalButtonProps> = ({
  asChild = false,
  children,
  className,
  ref,
  showArrow = true,
  showPrompt = true,
  size,
  variant,
  ...props
}) => {
  if (asChild) {
    const child = React.Children.only(children) as React.ReactElement<{
      children?: React.ReactNode
      className?: string
    }>
    return (
      <Slot
        className={cn(terminalButtonVariants({ className, size, variant }))}
        ref={ref as React.Ref<HTMLElement>}
        {...props}
      >
        {React.cloneElement(child, {
          children: (
            <TerminalStyleContent
              showArrow={showArrow}
              showPrompt={showPrompt}
              variant={variant}
            >
              {child.props.children}
            </TerminalStyleContent>
          ),
        })}
      </Slot>
    )
  }

  return (
    <button
      className={cn(terminalButtonVariants({ className, size, variant }))}
      ref={ref}
      type="button"
      {...props}
    >
      <TerminalStyleContent showArrow={showArrow} showPrompt={showPrompt} variant={variant}>
        {children}
      </TerminalStyleContent>
    </button>
  )
}

export { TerminalButton, terminalButtonVariants }
