import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import LoginForm from './LoginForm';

export default {
    title: 'features/LoginForm',
    component: LoginForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = () => <LoginForm />;

export const Primary = Template.bind({});

Primary.decorators = [StoreDecorator({
    loginForm: { username: 'username', password: 'password' },
})];

export const withError = Template.bind({});

withError.decorators = [StoreDecorator({
    loginForm: { username: 'username', password: 'password', error: 'ERROR' },
})];

export const Loading = Template.bind({});

Loading.decorators = [StoreDecorator({
    loginForm: { isLoading: true },
})];
