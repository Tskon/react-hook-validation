export interface FieldsConfig {
  [name: string]: (string|{type: string; value: unknown})[]
}

export type ValidationFn = (value: string, addValue?: unknown)=> boolean

export type ValidationsObject = {[key: string]: ValidationFn}
