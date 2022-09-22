export type ValidationType =
  'required'|
  'email'|
  'minLength'|
  'password'|
  'phone'|
  'telegram'|
  'url'|
  'name'|
  'slug'

export interface ValidationObjectType {
  type: ValidationType
  value: unknown
}

export interface FieldsConfig {
  [name: string]: (ValidationType|ValidationObjectType)[]
}

export type ValidationState<Type extends FieldsConfig> = {
  [Name in keyof Type]?: {
      [Validation in ValidationType]?: boolean|null
  }
}

export type ValidationFn = (value: string, addValue?: unknown)=> boolean
