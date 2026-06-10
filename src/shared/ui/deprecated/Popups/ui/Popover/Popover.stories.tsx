import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Popover } from './Popover';
import { Button } from '../../../Button/Button';

export default {
    title: 'shared/Popups/Popover',
    component: Popover,
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
} as ComponentMeta<typeof Popover>;

const Template: ComponentStory<typeof Popover> = (args) => (
    <Popover {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
    trigger: <Button>Open</Button>,
    children: <div>children children children children</div>,
};

export const TopRight = Template.bind({});
TopRight.args = {
    trigger: <Button>Open</Button>,
    children: <div>children children children children</div>,
    direction: 'top right',
};
export const TopLeft = Template.bind({});
TopLeft.args = {
    trigger: <Button>Open</Button>,
    children: <div>children children children children</div>,
    direction: 'top left',
};
export const BottomLeft = Template.bind({});
BottomLeft.args = {
    trigger: <Button>Open</Button>,
    children: <div>children children children children</div>,
    direction: 'bottom left',
};
export const BottomRight = Template.bind({});
BottomRight.args = {
    trigger: <Button>Open</Button>,
    children: <div>children children children children</div>,
    direction: 'bottom right',
};
