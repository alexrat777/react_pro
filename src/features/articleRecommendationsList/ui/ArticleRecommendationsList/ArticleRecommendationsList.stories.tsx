import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';

import {ArticleRecommendationsList} from './ArticleRecommendationsList';
import {StoreDecorator} from "shared/config/storybook/StoreDecorator/StoreDecorator";
import withMock from "storybook-addon-mock";
import {Article, ArticleType} from "entity/Article";

export default {
    title: 'features/ArticleRecommendationsList',
    component: ArticleRecommendationsList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [withMock]   //  декоратор для мока подгрузки данных через апи РТК query
} as ComponentMeta<typeof ArticleRecommendationsList>;
const article: Article = {
    id: "1",
    title: "Javascript news СВЕЖАЯ",
    subtitle: "Что нового в JS за 2022 год?",
    img: "https://teknotower.com/wp-content/uploads/2020/11/js.png",
    views: 1022,
    createdAt: "26.04.2022",
    user:{id:"1",username:'123'},
    type: [
        ArticleType.IT
    ],
    blocks:[],
}
const Template: ComponentStory<typeof ArticleRecommendationsList> = (args) => <ArticleRecommendationsList {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators=[StoreDecorator({})];
Normal.parameters = {
    mockData:[
        {
            url:__API__+'/articles?_limit=3',
            method:'GET',
            status:200,
            response:[
                {...article, id :'1'},
                {...article, id :'2'},
                {...article, id :'3'},
            ],
        }
    ]
}