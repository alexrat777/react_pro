import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Popover } from '../Popover/Popover';
import { Button } from '../../../Button/Button';

export default {
    title: 'shared/Popups/Popover',
    component: Popover,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [
        (Story) => <div style={{ padding: 150, display: 'flex' }}><Story /></div>,
    ],
} as ComponentMeta<typeof Popover>;

const Template: ComponentStory<typeof Popover> = (args) => <Popover {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    trigger: <Button>Open</Button>,
    children: <div>children children children children</div>,

};

export const topRight = Template.bind({});
topRight.args = {
    trigger: <Button>Open</Button>,
    children: <div>children children children children</div>,
    direction: 'top right',

};
export const topLeft = Template.bind({});
topLeft.args = {
    trigger: <Button>Open</Button>,
    children: <div>children children children children</div>,
    direction: 'top left',
};
export const bottomLeft = Template.bind({});
bottomLeft.args = {
    trigger: <Button>Open</Button>,
    children: <div>children children children children</div>,
    direction: 'bottom left',
};
export const bottomRight = Template.bind({});
bottomRight.args = {
    trigger: <Button>Open</Button>,
    children: <div>children children children children</div>,
    direction: 'bottom right',
};
