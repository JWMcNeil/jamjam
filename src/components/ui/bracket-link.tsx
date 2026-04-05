import { cn } from '@/utilities/ui'
import { Slot } from '@radix-ui/react-slot'
import Link from 'next/link'
import * as React from 'react'

const bracketLinkArrowMotionClass =
  'inline-block transition-transform duration-200 ease-out motion-safe:group-hover:translate-x-0.5'

const bracketLinkClassName =
  'group inline-flex items-baseline gap-x-1 font-mono text-sm text-text-prompt transition-colors hover:text-text-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

export type BracketLinkProps = React.ComponentProps<typeof Link> & {
  asChild?: boolean
  ref?: React.Ref<HTMLAnchorElement>
}

function BracketLinkInner({ children }: { children: React.ReactNode }) {
  return (
    <>
      <span aria-hidden className="text-text-prompt">
        [
      </span>
      <span>{children}</span>
      <span aria-hidden className="text-text-prompt">
        ]
      </span>
      <span aria-hidden className={cn('text-text-prompt', bracketLinkArrowMotionClass)}>
        {' '}
        -&gt;
      </span>
    </>
  )
}

const BracketLink: React.FC<BracketLinkProps> = ({
  asChild = false,
  children,
  className,
  ref,
  ...props
}) => {
  if (asChild) {
    const child = React.Children.only(children) as React.ReactElement<{
      children?: React.ReactNode
      className?: string
    }>
    return (
      <Slot className={cn(bracketLinkClassName, className)} ref={ref} {...props}>
        {React.cloneElement(child, {
          children: <BracketLinkInner>{child.props.children}</BracketLinkInner>,
        })}
      </Slot>
    )
  }

  return (
    <Link className={cn(bracketLinkClassName, className)} ref={ref} {...props}>
      <BracketLinkInner>{children}</BracketLinkInner>
    </Link>
  )
}

export { BracketLink }
