import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'
import {Form} from './form'

export default {
  title: 'Form Examples',
  component: Form,
} as ComponentMeta<typeof Form>

const Template: ComponentStory<typeof Form> = () => <Form />
const TemplateWithValidationState: ComponentStory<typeof Form> = () => <Form initValidation={{password: true, name: false, email: null}} />

export const EmptyForm = Template.bind({})

export const EmptyFormWithValidationState = TemplateWithValidationState.bind({})
