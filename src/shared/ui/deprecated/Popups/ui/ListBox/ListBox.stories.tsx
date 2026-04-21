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

export const topRight = Template.bind({});
topRight.args = {
    items: options,
    defaultValue: 'Select value',
    value: undefined,
    label: 'Label',
    direction: 'top right',
};
export const topLeft = Template.bind({});
topLeft.args = {
    items: options,
    defaultValue: 'Select value',
    value: undefined,
    label: 'Label',
    direction: 'top left',
};
export const bottomLeft = Template.bind({});
bottomLeft.args = {
    items: options,
    defaultValue: 'Select value',
    value: undefined,
    label: 'Label',
    direction: 'bottom left',
};
export const bottomRight = Template.bind({});
bottomRight.args = {
    items: options,
    defaultValue: 'Select value',
    value: undefined,
    label: 'Label',
    direction: 'bottom right',
};
