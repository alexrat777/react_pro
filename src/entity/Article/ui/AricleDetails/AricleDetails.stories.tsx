import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AricleDetails } from './AricleDetails';

export default {
    title: 'shared/AricleDetails',
    component: AricleDetails,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AricleDetails>;

const Template: ComponentStory<typeof AricleDetails> = (args) => <AricleDetails {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
