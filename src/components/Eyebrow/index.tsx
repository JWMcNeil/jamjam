import React from 'react'

type EyebrowProps = {
  TextLeft: string
  TextRight: string
}

export const Eyebrow: React.FC<EyebrowProps> = ({ TextLeft, TextRight }) => {
  return (
    <>
      <div className="flex items-center gap-4 pb-8 max-w-80">
        <h2 className="text-sm text-muted-foreground font-medium  uppercase tracking-wider text-nowrap">
          {TextLeft}
        </h2>
        <span className="h-px w-full bg-border flex-1"></span>
        <h2 className="text-sm text-muted-foreground font-medium  uppercase tracking-wider text-nowrap">
          {TextRight}
        </h2>
      </div>
    </>
  )
}
