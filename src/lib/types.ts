export type FieldsConfig<T extends string | number = string | number> = {
  [name: string]: (T | { type: T; value: unknown })[]
};

export type ValidationFn = (value: string, addValue?: unknown)=> boolean

export type ValidationsObject = {[key: string | number]: ValidationFn}
