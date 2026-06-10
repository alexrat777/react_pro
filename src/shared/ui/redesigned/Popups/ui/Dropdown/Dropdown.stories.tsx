import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from '../../../Button/Button';
import { Dropdown } from './Dropdown';

export default {
    title: 'shared/Popups/Dropdown',
    component: Dropdown,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [
        (Story) => (
            <div style={{ padding: 150, display: 'flex' }}>
                <Story />
            </div>
        ),
    ],
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => (
    <Dropdown {...args} />
);
const items = [
    { content: 'first' },
    { content: 'second' },
    { content: 'third' },
];
export const Primary = Template.bind({});
Primary.args = {
    trigger: <Button>Open</Button>,
    items,
};
export const LinkHref = Template.bind({});
LinkHref.args = {
    trigger: <Button>Open</Button>,
    items,
};

export const TopRight = Template.bind({});
TopRight.args = {
    trigger: <Button>Open</Button>,
    items,
    direction: 'top right',
};
export const TopLeft = Template.bind({});
TopLeft.args = {
    trigger: <Button>Open</Button>,
    items,
    direction: 'top left',
};
export const BottomLeft = Template.bind({});
BottomLeft.args = {
    trigger: <Button>Open</Button>,
    items,
    direction: 'bottom left',
};
export const BottomRight = Template.bind({});
BottomRight.args = {
    trigger: <Button>Open</Button>,
    items,
    direction: 'bottom right',
};
