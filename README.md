# Validation for React
Small. Simple. Without dependencies. Based on hooks. Typescript ready.

minified - `2kb`,
gzipped - less than `1kb` - [bundlephobia](https://bundlephobia.com/package/@tskon/react-hook-validation)

## Installation
`npm install @tskon/react-hook-validation` or `yarn add @tskon/react-hook-validation`

## Basic Usage
```js
import {createValidation} from '@tskon/react-hook-validation'
// initialise this in separate file only one for whole project.
const {useValidation} = createValidation({
  // your own validation rules
  myRule1: (valueFromInput) => valueFromInput === 'John',
  myRule2: (valueFromInput, optionalStaticValue) => valueFromInput === optionalStaticValue
})

const MyComponent = () => {
  const v = useValidation({
    myInput: [
      'required',
      'myRule1',
      { type: 'minLength', value: 2},
      { type: 'myRule2', value: 'John'},
    ]
  })
  
  const [inputValue, setInputValue] = useState('')
  const inputHandler = (e) => {
    setInputValue(e.target.value)
    v.validate(e.target.name, e.target.value)
  }
  
  return (
    <form>
      <input 
        value={inputValue}
        onChange={inputHandler}
        name="myInput"
      />
      
      <button disabled={!v.isValid()}>
        send
      </button>
    </form>
  )
}
```

## Init value for validation

useValidation(FieldsConfig[, InitValues])

possible values for init values: undefined, null, boolean

null, undefined - untouched state

true - touched, valid

false - touched, invalid
```js
const v = useValidation(
  {
    password: ['required', 'password'],
    link: ['url'],
    email: ['required', 'email']
  },
  {
    password: null,
    link: true,
  }
)
```

## Builtin validation list
 - required
 - email
 - url
 - minLength
 - password // check password strength
 - phone // in universal world format
 - telegram

## Validation methods
```js
const v = useValidation({
  // fields config
})
```
 - `v.validate(fieldName, fieldValue)` - use where you handle user input
 - `v.reset()` - reset validation state
 - `v.getState(fieldName?)` - returns validation state of one field or full state object.
 - `v.isInvalid(fieldName?)` - returns Boolean state about of one field / all fields. If field untouched - it's `false`
 - `v.isValid(fieldName?)` - returns Boolean state about of one field / all fields. If field untouched - it's `false`
 - `v.isTouched(fieldName?)` - returns Boolean touch state about of one field / all fields.
 - `v.isUntouched(fieldName?)` - returns Boolean touch state about of one field / all fields.
