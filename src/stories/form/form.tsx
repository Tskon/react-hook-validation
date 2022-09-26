import React, {ChangeEvent, FormEvent, useCallback, useState} from 'react';
import './styles.css';
import {useValidation} from "../../lib";

export interface FormProps {
  /**
   * Initial form data
   */
  initState?: {
    name?: string,
    email?: string,
    password?: string
  }
  /**
   * Submit handler
   */
  onSubmit?: () => void;
}

/**
 * Form component for user interaction
 */
export const Form = (props: FormProps) => {
  const v = useValidation({
    name: [{
      type: 'minLength',
      value: 2
    }],
    email: ['required', 'email'],
    password: ['required', 'password']
  })

  const [form, setForm] = useState({
    name: props.initState?.name || '',
    email: props.initState?.email || '',
    password: props.initState?.password || '',
  })

  const inputHandler = useCallback((e:ChangeEvent<HTMLInputElement>) => {
    setForm((state) => ({
      ...state,
      [e.target.name]: e.target.value
    }))

    v.validate(e.target.name, e.target.value)
  }, [])

  const submitHandler = useCallback((e:FormEvent) => {
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
    }
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
                    type={type}
                    name={key}
                    className="input"
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
  );
};
