import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Form } from './form';

export default {
  title: 'Form Examples',
  component: Form,
} as ComponentMeta<typeof Form>;

const Template: ComponentStory<typeof Form> = (args) => <Form {...args} />;

export const EmptyForm = Template.bind({})
EmptyForm.args = {}
