# Validation for React
Based on hooks

## Installation
`npm install @tskon/react-hook-validation`

`yarn add @tskon/react-hook-validation`

## Usage

```js
import {createValidation} from '@tskon/react-hook-validation'
// initialise this in separate file only one for whole project.
const {useValidation} = createValidation({
  // your own validation rules
  myRule: (valueFromInput, optionalStaticValue) => {
    return valueFromInput === optionalStaticValue
  }
})

const MyComponent = () => {
  const v = useValidation({
    myInput: [
      'name',
      { type: 'minLength', value: 2},
      { type: 'myRule', value: 'John'},
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
        name="name"
      />
      
      <button disabled={!v.isValid()}>
        send
      </button>
    </form>
  )
}
```
