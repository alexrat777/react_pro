import { memo, ReactNode, useCallback } from 'react';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Card, CardTheme } from '../Card/Card';
import cls from './Tabs.module.scss';

export interface TabItem<T extends string> {
    value: T;
    content: ReactNode;
}
interface TabsProps<T extends string> {
    className?: string;
    tabs: TabItem<T>[];
    value: T;
    onTabClick: (tab: TabItem<T>) => void;
}

export const Tabs = <T extends string>(props: TabsProps<T>) => {
    const {
        className, onTabClick, tabs, value,
    } = props;

    const clickHandle = useCallback((tab:TabItem<T>) => () => {
        onTabClick(tab);
    }, [onTabClick]);
    return (
        <div className={classNames(cls.Tabs, {}, [className])}>
            {tabs.map((tab) => (
                <Card
                    theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINE}
                    className={cls.tab}
                    key={tab.value}
                    onClick={clickHandle(tab)}
                >
                    {tab.content}
                </Card>
            ))}
        </div>
    );
};
