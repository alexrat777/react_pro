import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NotificationItem } from './NotificationItem';

export default {
    title: 'entities/Notification/NotificationItem',
    component: NotificationItem,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof NotificationItem>;
const item = {
    id: '2',
    title: 'Уведомление 2',
    description: 'Поставь лайк и оставь комментарий',
};
const Template: ComponentStory<typeof NotificationItem> = (args) => <NotificationItem {...args} />;

export const Primary = Template.bind({});
Primary.args = { item };
