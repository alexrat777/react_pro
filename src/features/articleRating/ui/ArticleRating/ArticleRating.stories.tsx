import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import withMock from 'storybook-addon-mock';
import ArticleRating from './ArticleRating';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import {
    Normal,
} from '@/features/articleRecommendationsList/ui/ArticleRecommendationsList/ArticleRecommendationsList.stories';

export default {
    title: 'features/Rating/ArticleRating',
    component: ArticleRating,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [withMock], //  декоратор для мока подгрузки данных через апи РТК query
} as ComponentMeta<typeof ArticleRating>;

const Template: ComponentStory<typeof ArticleRating> = (args) => <ArticleRating {...args} />;

export const Primary = Template.bind({});
Primary.args = { articleId: '1' };
Primary.decorators = [StoreDecorator({
    user: {
        authData: { id: '1' },
    },
})];
// замокать данные к серверу
Primary.parameters = {
    mockData: [
        {
            url: `${__API__}/article-ratings?userId=1&articleId=1`,
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
WhithOutRate.args = { articleId: '1' };
WhithOutRate.decorators = [StoreDecorator({
    user: {
        authData: { id: '1' },
    },
})];
// замокать данные к серверу
WhithOutRate.parameters = {
    mockData: [
        {
            url: `${__API__}/article-ratings?userId=1&articleId=1`,
            method: 'GET',
            status: 200,
            response: [
            ],
        },
    ],
};
