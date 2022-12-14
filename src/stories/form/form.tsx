import React, {ChangeEvent, FormEvent, useCallback, useState} from 'react'
import './styles.css'
import {createValidation} from '../../lib'

const {useValidation} = createValidation({
  custom: (value: string) => value === 'custom',
  customObj: (value, variousValue) => value === variousValue,
})

export interface FormProps {
  /**
   * Initial form data
   */
  initState?: {
    name?: string
    email?: string
    password?: string
  }

  /**
   * Initial validation data
   */
  initValidation?: Record<'name'|'email'|'password', boolean|null>
  /**
   * Submit handler
   */
  onSubmit?: ()=> void
}

/**
 * Form component for user interaction
 */
export const Form = (props: FormProps) => {
  const v = useValidation({
    name: [{
      type: 'minLength',
      value: '2',
    }, 'custom'],
    email: ['required', 'email'],
    password: ['password'],
  }, props.initValidation)

  const [form, setForm] = useState({
    name: props.initState?.name || '',
    email: props.initState?.email || '',
    password: props.initState?.password || '',
  })

  const inputHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setForm((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }))

    v.validate(e.target.name, e.target.value)
  }, [])

  const submitHandler = useCallback((e: FormEvent) => {
    e.preventDefault()
  }, [])

  const inputsData = [
    {
      key: 'name',
      type: 'text',
    },
    {
      key: 'email',
      type: 'email',
    },
    {
      key: 'password',
      type: 'password',
    },
  ]

  return (
    <form
      className="form"
      onSubmit={submitHandler}
    >
      {
        inputsData.map(({type, key}) => {
          const formKey = key as keyof typeof form

          return (
            <label key={key}>
              <span>
                {key.toUpperCase()}
              </span>

              <input
                className="input"
                name={key}
                type={type}
                value={form[key as keyof typeof form]}
                onInput={inputHandler}
              />

              <span className="v-status">
                Is valid:
                <i className={!v.isValid(formKey) ? 'negative-result' : ''}>
                  {v.isValid(formKey) ? 'true' : 'false'}
                </i>
              </span>

              <span>
                Is touched:
                <i className={v.isUntouched(formKey) ? 'negative-result' : ''}>
                  {v.isTouched(formKey) ? 'true' : 'false'}
                </i>
              </span>
            </label>
          )
        })
      }

      <button className="submit-button">
        submit
      </button>
    </form>
  )
}
