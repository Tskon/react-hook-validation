import {useState} from 'react'
import {FieldsConfig, ValidationsObject} from './types'
import * as validationFns from './validations'

const useInnerValidation = <Type extends FieldsConfig>(fieldsConfig: Type, validationFns: ValidationsObject, initState?: {
  [Name in keyof Type]?: boolean|null
}) => {
  type ValidationState = {
    [Name in keyof Type]?: {
      [Validation in keyof typeof validationFns]?: boolean|null
    }
  }

  const getValidationObject = (fieldsConfig: Type) => {
    const fieldNames = Object.keys(fieldsConfig) as (keyof Type)[]

    return fieldNames.reduce((obj, fieldName) => {
      const fieldState = {} as { [name: string|number]: boolean|null }
      fieldsConfig[fieldName].forEach(validation => {
        if (typeof validation === 'string' || typeof validation === 'number') {
          fieldState[validation] = (initState && typeof initState[fieldName] === 'boolean')
            ? initState[fieldName] as boolean
            : null
        } else {
          fieldState[validation.type] = (initState && typeof initState[fieldName] === 'boolean')
            ? initState[fieldName] as boolean
            : null
        }
      })

      return {...obj, [fieldName]: fieldState}
    }, {})
  }

  const [validationState, setValidationState] = useState<ValidationState>(getValidationObject(fieldsConfig))

  return {
    validate: (name: keyof Type|string, value: string) => {
      if (!fieldsConfig[name]) return

      const result = fieldsConfig[name].reduce((obj, validation) => {
        if (typeof validation === 'string' || typeof validation === 'number') {
          return {...obj, [validation]: validationFns[validation](value)}
        }

        return {...obj, [validation.type]: validationFns[validation.type](value, validation.value)}
      }, {})

      setValidationState(state => {
        return {
          ...state,
          [name]: result,
        }
      })
    },

    reset: () => {
      setValidationState(getValidationObject(fieldsConfig))
    },

    getState: (fieldName?: keyof Type) => {
      if (!fieldName) return validationState

      return validationState[fieldName]
    },

    isInvalid: (fieldName?: keyof Type) => {
      if (fieldName) {
        const field = validationState[fieldName]
        if (!field) return false

        return Object.values(field).some(value => value === false)
      }

      return Object.values(validationState).some(validationField => {
        if (!validationField) return false

        return Object.values(validationField).some(value => value === false)
      })
    },

    isValid: (fieldName?: keyof Type) => {
      if (fieldName) {
        const field = validationState[fieldName]
        if (!field) return false

        return Object.values(field).every(value => value === true)
      }

      return Object.values(validationState).every(validationField => {
        if (!validationField) return false

        return Object.values(validationField).every(value => value === true)
      })
    },

    isTouched: (fieldName?: keyof Type) => {
      if (fieldName) {
        const field = validationState[fieldName]
        if (!field) return false

        return Object.values(field).some(value => value !== null)
      }

      return Object.values(validationState).some(validationField => {
        if (!validationField) return false

        return Object.values(validationField).some(value => value !== null)
      })
    },

    isUntouched: (fieldName?: keyof Type) => {
      if (fieldName) {
        const field = validationState[fieldName]
        if (!field) return null

        return Object.values(field).every(value => value === null)
      }

      return Object.values(validationState).every(validationField => {
        if (!validationField) return null

        return Object.values(validationField).every(value => value === null)
      })
    },
  }
}

export const createValidation = <T extends ValidationsObject>(customValidations: T) => {
  const validations = {
    ...validationFns,
    ...customValidations,
  }

  type ValidationKeys = keyof typeof validationFns | Exclude<keyof T, symbol>

  return {
    useValidation(fieldsConfig: FieldsConfig<ValidationKeys>, initState?: Record<string, boolean|null>) {
      return useInnerValidation(fieldsConfig, validations, initState)
    },
  }
}

export type ValidationKeys = keyof typeof validationFns

export {ValidationFn, FieldsConfig} from './types'
