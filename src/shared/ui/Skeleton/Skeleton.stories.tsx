import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Skeleton } from './Skeleton';

export default {
    title: 'shared/Skeleton',
    component: Skeleton,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = (args) => <Skeleton {...args} />;

export const Primary = Template.bind({});
Primary.args = { height: 200, width: '100%' };
export const Circle = Template.bind({});
Circle.args = { height: 100, width: 100, borderRadius: '50%' };

export const Dark = Template.bind({});
Dark.args = { height: 200, width: '100%' };
Dark.decorators = [ThemeDecorator(Theme.DARK)];
export const DarkCircle = Template.bind({});
DarkCircle.args = { height: 100, width: 100, borderRadius: '50%' };
DarkCircle.decorators = [ThemeDecorator(Theme.DARK)];
