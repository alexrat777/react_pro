import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AvatarDropdown } from './AvatarDropdown';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { UserRole } from '@/entities/User';

export default {
    title: 'features/AvatarDropdown',
    component: AvatarDropdown,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [
        (Story) => <div style={{ display: 'flex', justifyContent: 'flex-end' }}><Story /></div>,
    ],
} as ComponentMeta<typeof AvatarDropdown>;

const Template: ComponentStory<typeof AvatarDropdown> = (args) => <AvatarDropdown {...args} />;

export const Admin = Template.bind({});
Admin.args = {};
Admin.decorators = [StoreDecorator({
    user: {
        authData: {
            role: [UserRole.ADMIN],
            avatar: 'https://www.gstatic.com/images/branding/product/1x/contacts_2022_48dp.png',
        },
    },
})];
export const User = Template.bind({});
User.args = {};
User.decorators = [StoreDecorator({
    user: {
        authData: {
            role: [UserRole.USER],
            avatar: 'https://www.gstatic.com/images/branding/product/1x/contacts_2022_48dp.png',
        },
    },
})];
