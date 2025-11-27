import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import AvatarImg from '@/shared/assets/tests/avatar.jpg';
import { Avatar } from '@/shared/ui/Avatar';
import { ProfileCard } from './ProfileCard';

export default {
    title: 'features/ProfileCard',
    component: ProfileCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    data: {
        username: 'admin',
        age: 22,
        country: Country.Kazakhstan,
        lastname: 'lastname',
        first: 'firstname',
        city: 'city',
        currency: Currency.RUB,
        avatar: AvatarImg,
    },
};

export const withError = Template.bind({});
withError.args = {
    error: 'error',
};

export const loading = Template.bind({});
loading.args = {
    isLoading: true,
};
