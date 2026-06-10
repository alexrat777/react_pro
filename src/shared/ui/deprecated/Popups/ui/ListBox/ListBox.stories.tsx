import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ListBox } from './ListBox';

export default {
    title: 'shared/Popups/ListBox',
    component: ListBox,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [
        (Story) => (
            <div style={{ padding: 150 }}>
                <Story />
            </div>
        ),
    ],
} as ComponentMeta<typeof ListBox>;
const options = [
    { value: '1', content: 'valuevaluevalue 1' },
    { value: '2', content: 'valuevaluevalue 2' },
    { value: '3', content: 'valuevaluevalue 3', disabled: true },
    { value: '4', content: 'valuevaluevalue 4' },
];
const Template: ComponentStory<typeof ListBox> = (args) => (
    <ListBox {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
    items: options,
    value: '1',
};
export const ReadOnly = Template.bind({});
ReadOnly.args = {
    items: options,
    value: '1',
    readOnly: true,
};
export const NoSelect = Template.bind({});
NoSelect.args = {
    items: options,
    defaultValue: 'Select value',
    value: undefined,
};
export const WithLabel = Template.bind({});
WithLabel.args = {
    items: options,
    defaultValue: 'Select value',
    value: undefined,
    label: 'Label',
};

export const TopRight = Template.bind({});
TopRight.args = {
    items: options,
    defaultValue: 'Select value',
    value: undefined,
    label: 'Label',
    direction: 'top right',
};
export const TopLeft = Template.bind({});
TopLeft.args = {
    items: options,
    defaultValue: 'Select value',
    value: undefined,
    label: 'Label',
    direction: 'top left',
};
export const BottomLeft = Template.bind({});
BottomLeft.args = {
    items: options,
    defaultValue: 'Select value',
    value: undefined,
    label: 'Label',
    direction: 'bottom left',
};
export const BottomRight = Template.bind({});
BottomRight.args = {
    items: options,
    defaultValue: 'Select value',
    value: undefined,
    label: 'Label',
    direction: 'bottom right',
};
