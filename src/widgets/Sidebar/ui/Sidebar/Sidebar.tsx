import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { memo, useMemo, useState } from 'react';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import SidebarItem from '../SidebarItem/SidebarItem';
import cls from './Sidebar.module.scss';

interface SidebarProps {
    className?: string;
}

const Sidebar = memo((props:SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const { className } = props;
    const onToggle = () => {
        setCollapsed((prev) => !prev);
    };
    const SidebarItemList = useSelector(getSidebarItems);
    const itemsList = useMemo(() => SidebarItemList.map((item) => (
        <SidebarItem
            key={`SidebarItem${item.text}`}
            item={item}
            collapsed={collapsed}
        />
    )), [SidebarItemList, collapsed]);
    return (
        <div
            data-testid="sidebar"
            className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}
        >
            <Button
                onClick={onToggle}
                data-testid="sidebar-toggle"
                className={cls.collapseBtn}
                theme={ButtonTheme.BACKGROUND_INVERTED}
                square
                size={ButtonSize.L}
            >
                {collapsed ? '>' : '<'}
            </Button>
            <div className={cls.items}>
                {itemsList}
            </div>
            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher
                    className={cls.lang}
                    short={collapsed}
                />
            </div>
        </div>
    );
});

export default Sidebar;
