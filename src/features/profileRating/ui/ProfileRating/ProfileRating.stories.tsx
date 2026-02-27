import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ProfileRating from './ProfileRating';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
    title: 'features/Rating/ProfileRating',
    component: ProfileRating,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    // decorators: [withMock], //  декоратор для мока подгрузки данных через апи РТК query   на новой версии сторибук не нужен
} as ComponentMeta<typeof ProfileRating>;

const Template: ComponentStory<typeof ProfileRating> = (args) => (
    <ProfileRating {...args} />
);

export const Primary = Template.bind({});
Primary.args = { profileId: '1' };
Primary.decorators = [
    StoreDecorator({
        user: {
            authData: { id: '1' },
        },
    }),
];
// замокать данные к серверу
Primary.parameters = {
    mockData: [
        {
            url: `${__API__}/profile-ratings?userId=1&profileId=1`,
            method: 'GET',
            status: 200,
            response: [
                {
                    rate: 4,
                },
            ],
        },
    ],
};
export const WhithOutRate = Template.bind({});
WhithOutRate.args = { profileId: '1' };
WhithOutRate.decorators = [
    StoreDecorator({
        user: {
            authData: { id: '1' },
        },
    }),
];
// замокать данные к серверу
WhithOutRate.parameters = {
    mockData: [
        {
            url: `${__API__}/profile-ratings?userId=1&profileId=1`,
            method: 'GET',
            status: 200,
            response: [],
        },
    ],
};
