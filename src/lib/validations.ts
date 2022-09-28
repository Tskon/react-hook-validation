const emailRegExp = /^[a-z0-9.]+@[a-z]+\.[a-z]{2,3}$/
const passwordStrengthRegExp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/
const telegramRegExp = /^@.{4,63}$/
const urlRegExp = /^([(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|localhost)\b([-a-zA-Z0-9@:%_\+.~#?&\/=]*)$/
const nameRegExp = /[\da-zA-Zа-яА-Я-]{2,}/
const slugRegExp = /^[-0-9a-z]{2,75}$/
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

// TODO delete validations below, because its for narrow usage

export const name = (value: string) => {
  if (!value) return true

  return nameRegExp.test(value.trim())
}

export const slug = (value: string) => {
  if (!value) return true

  return slugRegExp.test(value.trim())
}
