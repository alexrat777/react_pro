import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from 'shared/ui/Button/Button';
import { Dropdown } from './Dropdown';

export default {
    title: 'shared/Dropdown',
    component: Dropdown,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [
        (Story) => <div style={{ padding: 150, display: 'flex' }}><Story /></div>,
    ],
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => <Dropdown {...args} />;
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

export const topRight = Template.bind({});
topRight.args = {
    trigger: <Button>Open</Button>,
    items,
    direction: 'top right',

};
export const topLeft = Template.bind({});
topLeft.args = {
    trigger: <Button>Open</Button>,
    items,
    direction: 'top left',
};
export const bottomLeft = Template.bind({});
bottomLeft.args = {
    trigger: <Button>Open</Button>,
    items,
    direction: 'bottom left',
};
export const bottomRight = Template.bind({});
bottomRight.args = {
    trigger: <Button>Open</Button>,
    items,
    direction: 'bottom right',
};
