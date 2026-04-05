import { cn } from '@/utilities/ui'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

export const terminalStyleShellClass =
  'group inline-flex items-center justify-center gap-x-1.5 whitespace-nowrap rounded-sm font-mono transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50'

export const arrowMotionClass =
  'inline-block transition-transform duration-200 ease-out motion-safe:group-hover:translate-x-0.5'

function arrowClassForVariant(variant: string | null | undefined): string {
  const v = variant ?? 'outline'
  if (v === 'accent-bracket') return 'text-text-heading'
  if (v === 'destructive') return 'text-destructive'
  if (v === 'solid' || v === 'inverse' || v === 'default' || v === 'secondary') return 'text-text-prompt'
  return 'text-text-heading'
}

function promptClassForVariant(variant: string | null | undefined): string {
  const v = variant ?? 'outline'
  const muted = v === 'solid' || v === 'inverse' || v === 'default' || v === 'secondary'
  return muted ? 'text-text-prompt' : 'text-primary'
}

function labelClassForVariant(variant: string | null | undefined): string {
  const v = variant ?? 'outline'
  if (v === 'link') {
    return 'inline-flex items-center gap-1'
  }
  return 'inline-flex items-center gap-1 text-text-heading'
}

export type TerminalStyleContentProps = {
  children: React.ReactNode
  showArrow?: boolean
  showPrompt?: boolean
  variant?: string | null
}

export function TerminalStyleContent({
  children,
  showArrow = false,
  showPrompt = false,
  variant,
}: TerminalStyleContentProps) {
  const v = variant ?? 'outline'

  if (v === 'accent-bracket') {
    return (
      <>
        <span className="text-primary" aria-hidden>
          [
        </span>
        <span className={cn('inline-flex items-center gap-1 text-text-heading')}>{children}</span>
        <span className="text-primary" aria-hidden>
          ]
        </span>
        {showArrow ? (
          <span className={cn('text-text-heading', arrowMotionClass)} aria-hidden>
            {' '}
            -&gt;
          </span>
        ) : null}
      </>
    )
  }

  const promptClass = promptClassForVariant(v)
  const labelClass = labelClassForVariant(v)
  const arrowClass = arrowClassForVariant(v)

  return (
    <>
      {showPrompt ? (
        <span className={promptClass} aria-hidden>
          ${' '}
        </span>
      ) : null}
      <span className={labelClass}>{children}</span>
      {showArrow ? (
        <span className={cn(arrowClass, arrowMotionClass)} aria-hidden>
          {' '}
          -&gt;
        </span>
      ) : null}
    </>
  )
}

const buttonVariants = cva(terminalStyleShellClass, {
  defaultVariants: {
    size: 'default',
    variant: 'default',
  },
  variants: {
    size: {
      clear: '',
      default: 'min-h-9 px-3 py-2 text-sm',
      icon: 'min-h-9 w-9 shrink-0 p-0',
      lg: 'min-h-10 px-4 py-2.5 text-base',
      sm: 'min-h-8 px-2.5 py-1.5 text-xs',
    },
    variant: {
      default: 'border border-border bg-grey-100 text-text-heading hover:bg-grey-150',
      destructive:
        'border border-destructive/40 bg-destructive/10 text-destructive hover:bg-destructive/20',
      ghost: 'border border-transparent bg-transparent text-text-heading hover:bg-card',
      link: 'h-auto min-h-0 justify-start border border-transparent bg-transparent p-0 text-primary underline-offset-4 hover:underline',
      outline: 'border border-border bg-page text-text-heading hover:bg-card',
      secondary: 'border border-border-subtle bg-grey-150 text-text-heading hover:bg-grey-200',
      miniOutline:
        'min-h-7 border border-border bg-page px-2 py-1 text-xs text-text-heading hover:bg-card',
      white: 'border border-border-subtle bg-white text-black hover:bg-grey-150',
    },
  },
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
  ref?: React.Ref<HTMLButtonElement>
  showArrow?: boolean
}

const Button: React.FC<ButtonProps> = ({
  asChild = false,
  children,
  className,
  ref,
  showArrow = false,
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
        className={cn(buttonVariants({ className, size, variant }))}
        ref={ref as React.Ref<HTMLElement>}
        {...props}
      >
        {React.cloneElement(child, {
          children: (
            <TerminalStyleContent showArrow={showArrow} showPrompt={false} variant={variant}>
              {child.props.children}
            </TerminalStyleContent>
          ),
        })}
      </Slot>
    )
  }

  const { type, ...rest } = props

  return (
    <button
      className={cn(buttonVariants({ className, size, variant }))}
      ref={ref}
      type={type ?? 'button'}
      {...rest}
    >
      <TerminalStyleContent showArrow={showArrow} showPrompt={false} variant={variant}>
        {children}
      </TerminalStyleContent>
    </button>
  )
}

export { Button, buttonVariants }
