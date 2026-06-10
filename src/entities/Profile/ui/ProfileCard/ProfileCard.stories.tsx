import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import AvatarImg from '@/shared/assets/tests/avatar.jpg';
import { ProfileCard } from './ProfileCard';
import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'entities/ProfileCard',
    component: ProfileCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => (
    <ProfileCard {...args} />
);
const primaryArg = {
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
export const Primary = Template.bind({});
Primary.args = primaryArg;
export const PrimaryNewDesign = Template.bind({});
PrimaryNewDesign.args = primaryArg;
PrimaryNewDesign.decorators = [
    FeatureFlagsDecorator({ isAppRedesigned: true }),
];
export const PrimaryNewDesignBlack = Template.bind({});
PrimaryNewDesignBlack.args = primaryArg;
PrimaryNewDesignBlack.decorators = [
    NewDesignDecorator,
    ThemeDecorator(Theme.DARK),
];
export const PrimaryNewDesignOrange = Template.bind({});
PrimaryNewDesignOrange.args = primaryArg;
PrimaryNewDesignOrange.decorators = [
    NewDesignDecorator,
    ThemeDecorator(Theme.ORANGE),
];
export const WithError = Template.bind({});
WithError.args = {
    error: 'error',
};
export const WithErrorNewDesign = Template.bind({});
WithErrorNewDesign.args = {
    error: 'error',
};
WithErrorNewDesign.decorators = [
    FeatureFlagsDecorator({ isAppRedesigned: true }),
];

export const Loading = Template.bind({});
Loading.args = {
    isLoading: true,
};
export const LoadingNewDesign = Template.bind({});
LoadingNewDesign.args = {
    isLoading: true,
};
LoadingNewDesign.decorators = [
    FeatureFlagsDecorator({ isAppRedesigned: true }),
];
