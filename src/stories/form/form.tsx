import React, {ChangeEvent, useCallback, useState} from 'react';
import './styles.css';

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
  }, [])

  return (
    <form
      className="form"
    >
      <label>
        <span>Name</span>
        <input

            type="text"
            name="name"
            className="input"
            value={form.name}
            onInput={inputHandler}
        />
      </label>

      <label>
        <span>Email</span>
        <input
            type="email"
            name="email"
            className="input"
            value={form.email}
            onInput={inputHandler}
        />
      </label>

      <label>
        <span>Password</span>
        <input
            type="password"
            name="password"
            className="input"
            value={form.password}
            onInput={inputHandler}
        />
      </label>

      <button className="submit-button">
        submit
      </button>
    </form>
  );
};
