'use client'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { TerminalButton } from '@/components/ui/terminal-button'
import { cn } from '@/utilities/ui'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'

function isFormFieldFullWidth(field: FormFieldBlock): boolean {
  if (field.blockType === 'message') return true
  if (!('width' in field) || field.width == null) return true
  return field.width >= 100
}

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: DefaultTypedEditorState
}

export type FormBlockProps = {
  id?: string
  variant?: 'default' | 'contact'
} & FormBlockType

export const FormBlock: React.FC<FormBlockProps> = (props) => {
  const { enableIntro, form: formFromProps, introContent, variant = 'default' } = props
  const isContact = variant === 'contact'

  // All hooks must be called before any conditional returns
  const formMethods = useForm({
    defaultValues: formFromProps?.fields || {},
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string | number } | undefined>()
  const router = useRouter()

  const {
    id: formID,
    confirmationMessage,
    confirmationType,
    redirect,
    submitButtonLabel,
  } = formFromProps || {}

  const onSubmit = useCallback(
    (data: FormFieldBlock[]) => {
      if (!formFromProps || !formID) return

      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)

            setError({
              message: res.errors?.[0]?.message || 'Internal Server Error',
              status: req.status,
            })

            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect

            const redirectUrl = url

            if (redirectUrl) router.push(redirectUrl)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Something went wrong.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType, formFromProps],
  )

  if (!formFromProps) {
    return null
  }

  const fieldList = formFromProps.fields?.map((field, index) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
    if (!Field) return null

    const fieldForUi =
      isContact && 'width' in field ? ({ ...field, width: undefined } as typeof field) : field

    const inner = (
      <Field
        form={formFromProps}
        {...fieldForUi}
        {...formMethods}
        control={control}
        errors={errors}
        register={register}
      />
    )

    if (isContact) {
      return (
        <div
          className={cn('w-full', isFormFieldFullWidth(field) ? 'md:col-span-2' : 'md:col-span-1')}
          key={index}
        >
          {inner}
        </div>
      )
    }

    return (
      <div className="mb-6 last:mb-0" key={index}>
        {inner}
      </div>
    )
  })

  const formBody = (
    <>
      {!isLoading && hasSubmitted && confirmationType === 'message' && (
        <RichText data={confirmationMessage} />
      )}
      {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
      {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}
      {!hasSubmitted && (
        <form id={String(formID)} onSubmit={handleSubmit(onSubmit)}>
          <div
            className={
              isContact
                ? 'grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6'
                : 'mb-6 last:mb-0'
            }
          >
            {fieldList}
          </div>

          {isContact ? (
            <div className="mt-8 flex justify-end">
              <TerminalButton type="submit" showArrow showPrompt variant="inverse" className="cursor-pointer">
                {submitButtonLabel}
              </TerminalButton>
            </div>
          ) : (
            <Button form={String(formID)} type="submit" variant="outline" className="w-full sm:w-auto">
              {submitButtonLabel}
            </Button>
          )}
        </form>
      )}
    </>
  )

  if (isContact) {
    return (
      <div className="w-full">
        {enableIntro && introContent && !hasSubmitted && (
          <RichText className="mb-8 lg:mb-12" data={introContent} enableGutter={false} />
        )}
        <FormProvider {...formMethods}>{formBody}</FormProvider>
      </div>
    )
  }

  return (
    <div className="container lg:max-w-[48rem]">
      {enableIntro && introContent && !hasSubmitted && (
        <RichText className="mb-8 lg:mb-12" data={introContent} enableGutter={false} />
      )}
      <div className="p-6 lg:p-8 border border-border rounded-lg bg-card/50 backdrop-blur-sm shadow-lg">
        <FormProvider {...formMethods}>{formBody}</FormProvider>
      </div>
    </div>
  )
}
