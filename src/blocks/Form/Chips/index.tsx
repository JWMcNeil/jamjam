'use client'

import type { Control, FieldErrorsImpl } from 'react-hook-form'

import { Controller } from 'react-hook-form'
import { cn } from '@/utilities/ui'
import React from 'react'
import { getIcon } from '@/utilities/icons'

import { Error } from '../Error'
import { Label } from '@/components/ui/label'

export type ChipsField = {
  name: string
  label?: string | null
  required?: boolean | null
  options?: Array<{ label: string; icon: string; id?: string | null }> | null
  defaultValue?: string[] | null
  errors: Partial<FieldErrorsImpl>
  control: Control
}

export const Chips: React.FC<ChipsField> = ({
  name,
  label,
  required,
  options = [],
  defaultValue,
  errors,
  control,
}) => {
  return (
    <div>
      {label && (
        <Label className="mb-4 block text-base font-semibold">
          {label}
          {required && (
            <span className="required">
              * <span className="sr-only">(required)</span>
            </span>
          )}
        </Label>
      )}
      <Controller
        control={control}
        defaultValue={defaultValue || []}
        name={name}
        render={({ field: { onChange, value } }) => {
          const selectedValues = Array.isArray(value) ? value : []

          const toggleValue = (optionIcon: string) => {
            const newValues = selectedValues.includes(optionIcon)
              ? selectedValues.filter((v) => v !== optionIcon)
              : [...selectedValues, optionIcon]
            onChange(newValues)
          }

          return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {options?.map((option) => {
                const isSelected = selectedValues.includes(option.icon)
                const IconComponent = getIcon(option.icon)

                return (
                  <button
                    key={option.icon}
                    type="button"
                    onClick={() => toggleValue(option.icon)}
                    className={cn(
                      'flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg border transition-all duration-200',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                      'hover:scale-[1.02] active:scale-[0.98]',
                      isSelected
                        ? 'bg-foreground text-background border-foreground'
                        : 'bg-card/50 text-foreground border-border hover:bg-card hover:border-ring/50 hover:shadow-sm',
                    )}
                  >
                    {IconComponent && (
                      <IconComponent
                        className={cn(
                          'h-5 w-5 shrink-0 transition-colors',
                          isSelected ? 'text-background' : 'text-muted-foreground',
                        )}
                      />
                    )}
                    <span
                      className={cn(
                        'text-sm font-medium',
                        isSelected ? 'text-background' : 'text-foreground',
                      )}
                    >
                      {option.label}
                    </span>
                  </button>
                )
              })}
            </div>
          )
        }}
        rules={{ required: required ?? false }}
      />
      {errors[name] && <Error name={name} />}
    </div>
  )
}
