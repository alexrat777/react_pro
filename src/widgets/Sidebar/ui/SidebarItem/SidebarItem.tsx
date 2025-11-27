import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { AppLink, AppLinkThem } from '@/shared/ui/AppLink';
import { getUserAuthData } from '@/entities/User';
import { SidebarItemType } from '../../model/types/sidebar';
import cls from './SidebarItem.module.scss';

interface SidebarItemProps {
    item:SidebarItemType;
    collapsed: boolean;
}

const SidebarItem = (props:SidebarItemProps) => {
    const { item, collapsed } = props;
    const { t } = useTranslation();
    const isAuth = useSelector(getUserAuthData); // проверяем залогинен ли
    if (item.authOnly && !isAuth) { return null; }
    return (
        <AppLink
            className={classNames(cls.item, { [cls.collapsed]: collapsed })}
            theme={AppLinkThem.SECONDARY}
            to={item.path}
        >
            <item.Icon
                className={cls.icon}
            />
            <span className={cls.link}>
                {t(item.text)}
            </span>
        </AppLink>

    );
};

export default SidebarItem;
