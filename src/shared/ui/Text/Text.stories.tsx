import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import Text, { TextTheme } from './Text';

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
export const onlyTitle = Template.bind({});
onlyTitle.args = {
    title: 'title Text',
};
export const onlyText = Template.bind({});
onlyText.args = {
    text: 'text Text',
};
export const Dark = Template.bind({});
Dark.args = {
    title: 'title Text',
    text: 'text Text',
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const onlyTitleDark = Template.bind({});
onlyTitleDark.args = {
    title: 'title Text',
};
onlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const onlyTextDark = Template.bind({});
onlyTextDark.args = {
    text: 'text Text',
};
onlyTextDark.decorators = [ThemeDecorator(Theme.DARK)];
export const Error = Template.bind({});
Error.args = {
    title: 'title Text',
    text: 'text Text',
    theme: TextTheme.ERROR,
};
