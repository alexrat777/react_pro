import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CommentCard } from './CommentCard';
import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';

export default {
    title: 'entities/Comment/CommentCard',
    component: CommentCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => (
    <CommentCard {...args} />
);
const normalArg = {
    comment: {
        id: '1',
        text: 'Hello World',
        user: { id: '1', username: 'user' },
    },
};
export const Primary = Template.bind({});
Primary.args = normalArg;
export const PrimaryNewDesign = Template.bind({});
PrimaryNewDesign.args = normalArg;
PrimaryNewDesign.decorators = [
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
