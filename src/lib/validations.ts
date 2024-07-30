const emailRegExp = /^[a-zA-Z0-9.-]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/
const passwordStrengthRegExp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/
const telegramRegExp = /^@.{4,63}$/
const urlRegExp = /(([(http(s)?):\/\/(www\.)?-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6})|((http(s)?:\/\/)?localhost))\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
const phoneRegExp = /^\+(\s?[()-]?\s?\d){5,15}$/

export const required = (value: string) => {
  return Boolean(value.trim().length)
}

export const email = (value: string) => {
  if (!value) return true

  return emailRegExp.test(value.trim())
}

export const minLength = (value: string, num: number) => {
  return value.trim().length >= num
}

export const password = (value: string) => {
  if (!value) return true

  return passwordStrengthRegExp.test(value.trim())
}

export const phone = (value: string) => {
  if (!value) return true

  return phoneRegExp.test(value.trim())
}

export const telegram = (value: string) => {
  if (!value) return true
  const trimmedValue = value.trim()

  return telegramRegExp.test(trimmedValue) || phoneRegExp.test(trimmedValue)
}

export const url = (value: string) => {
  if (!value) return true

  return urlRegExp.test(value.trim())
}
