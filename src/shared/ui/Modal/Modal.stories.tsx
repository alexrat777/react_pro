import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import Modal from '../Modal/Modal';

export default {
    title: 'shared/Modal',
    component: Modal,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    isOpen: true,
    children: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus adipisci aperiam assumenda at blanditiis consequatur cum dignissimos dolor dolores eum fugit id in iste magnam magni mollitia nesciunt nihil nobis numquam officia, officiis quidem reiciendis rerum soluta temporibus, totam ut. Ad animi culpa debitis, deleniti dolore eius eos eum fugiat fugit nam officiis quasi, qui rem sed voluptatibus? Accusantium harum modi optio possimus ut voluptatum! Animi aperiam architecto atque consequuntur cupiditate deserunt, dolore ducimus est et, eum eveniet expedita, id labore minima necessitatibus nostrum numquam perferendis placeat quaerat quisquam quo repudiandae sunt. Blanditiis eius eos numquam perferendis quisquam, repudiandae sunt.',
};
export const Dark = Template.bind({});
Dark.args = {
    isOpen: true,
    children: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus adipisci aperiam assumenda at blanditiis consequatur cum dignissimos dolor dolores eum fugit id in iste magnam magni mollitia nesciunt nihil nobis numquam officia, officiis quidem reiciendis rerum soluta temporibus, totam ut. Ad animi culpa debitis, deleniti dolore eius eos eum fugiat fugit nam officiis quasi, qui rem sed voluptatibus? Accusantium harum modi optio possimus ut voluptatum! Animi aperiam architecto atque consequuntur cupiditate deserunt, dolore ducimus est et, eum eveniet expedita, id labore minima necessitatibus nostrum numquam perferendis placeat quaerat quisquam quo repudiandae sunt. Blanditiis eius eos numquam perferendis quisquam, repudiandae sunt.',
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
