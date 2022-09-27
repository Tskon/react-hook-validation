import {useState} from 'react'
import {FieldsConfig, ValidationFn, ValidationsObject} from './types'
import * as validations from './validations'

export type ValidationFunction = ValidationFn

const validationFns = {
  ...validations,
} as ValidationsObject

const useInnerValidation = <Type extends FieldsConfig>(fieldsConfig: Type, validationFns: ValidationsObject) => {
  type ValidationState = {
    [Name in keyof Type]?: {
      [Validation in keyof typeof validationFns]?: boolean|null
    }
  }

  const getValidationObject = (fieldsConfig: Type) => {
    const fieldNames = Object.keys(fieldsConfig) as (keyof Type)[]

    return fieldNames.reduce((obj, fieldName) => {
      const fieldState = {} as { [name: string]: boolean|null }
      fieldsConfig[fieldName].forEach(validation => {
        if (typeof validation === 'string') {
          fieldState[validation] = null
        } else {
          fieldState[validation.type] = null
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
        if (typeof validation === 'string') {
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

export const createValidation = (customValidations: ValidationsObject) => {
  const validations = {
    ...validationFns,
    ...customValidations,
  }



  return {
    useValidation(fieldsConfig: FieldsConfig) {
      return useInnerValidation(fieldsConfig, validations)
    },
  }
}
