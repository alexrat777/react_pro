import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ListBox } from './ListBox';

export default {
    title: 'shared/ListBox',
    component: ListBox,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ListBox>;
const options = [
    { value: '1', content: 'value 1' },
    { value: '2', content: 'value 2' },
    { value: '3', content: 'value 3', disabled: true },
    { value: '4', content: 'value 4' },
];
const Template: ComponentStory<typeof ListBox> = (args) => <ListBox {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    items: options,
    value: '1',

};
export const readOnly = Template.bind({});
readOnly.args = {
    items: options,
    value: '1',
    readOnly: true,
};
export const noSelect = Template.bind({});
noSelect.args = {
    items: options,
    defaultValue: 'Select value',
    value: undefined,
};
export const withLabel = Template.bind({});
withLabel.args = {
    items: options,
    defaultValue: 'Select value',
    value: undefined,
    label: 'Label',
};
