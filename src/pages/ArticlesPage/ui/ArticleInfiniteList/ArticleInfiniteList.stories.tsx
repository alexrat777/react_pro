import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticleInfiniteList } from './ArticleInfiniteList';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
    title: 'pages/ArticlesPage/ArticleInfiniteList',
    component: ArticleInfiniteList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleInfiniteList>;

const Template: ComponentStory<typeof ArticleInfiniteList> = (args) => <ArticleInfiniteList {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [StoreDecorator({
    articlesPage: {
        isLoading: false,
        page: 1,
        ids: ['2'],
        entities: {
            2: {
                id: '1',
                title: 'Python news',
                subtitle: 'Что нового в JS за 2022 год?',
                img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Python_logo_and_wordmark.svg/2560px-Python_logo_and_wordmark.svg.png',
                views: 5204,
                createdAt: '26.02.2022',
                user: {
                    id: '1',
                },

            },
        },
    },
})];

// как замокать стору которая работает через адаптер?
// https://redux-toolkit.js.org/api/createEntityAdapter
