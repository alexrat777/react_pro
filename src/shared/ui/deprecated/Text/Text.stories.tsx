import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Text, TextAlign, TextSize, TextTheme } from './Text';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'shared/Text',
    component: Text,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    title: 'title Text',
    text: 'text Text',
};
export const RightText = Template.bind({});
RightText.args = {
    title: 'title Text',
    text: 'text Text',
    align: TextAlign.RIGHT,
};
export const CenterText = Template.bind({});
CenterText.args = {
    title: 'title Text',
    text: 'text Text',
    align: TextAlign.CENTER,
};
export const OnlyTitle = Template.bind({});
OnlyTitle.args = {
    title: 'title Text',
};
export const OnlyText = Template.bind({});
OnlyText.args = {
    text: 'text Text',
};
export const Dark = Template.bind({});
Dark.args = {
    title: 'title Text',
    text: 'text Text',
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyTitleDark = Template.bind({});
OnlyTitleDark.args = {
    title: 'title Text',
};
OnlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyTextDark = Template.bind({});
OnlyTextDark.args = {
    text: 'text Text',
};
OnlyTextDark.decorators = [ThemeDecorator(Theme.DARK)];
export const Error = Template.bind({});
Error.args = {
    title: 'title Text',
    text: 'text Text',
    theme: TextTheme.ERROR,
};
export const SizeL = Template.bind({});
SizeL.args = {
    title: 'title Text',
    text: 'text Text',
    size: TextSize.L,
};
export const SizeM = Template.bind({});
SizeM.args = {
    title: 'title Text',
    text: 'text Text',
    size: TextSize.M,
};
export const SizeS = Template.bind({});
SizeS.args = {
    title: 'title Text',
    text: 'text Text',
    size: TextSize.S,
};
