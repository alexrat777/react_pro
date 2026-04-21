import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import {
    AppLink as AppLinkDepricated,
    AppLinkThem,
} from '@/shared/ui/deprecated/AppLink';
import { getUserAuthData } from '@/entities/User';
import { SidebarItemType } from '../../model/types/sidebar';
import cls from './SidebarItem.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Icon } from '@/shared/ui/redesigned/Icon';

interface SidebarItemProps {
    item: SidebarItemType;
    collapsed: boolean;
}

const SidebarItem = (props: SidebarItemProps) => {
    const { item, collapsed } = props;
    const { t } = useTranslation();
    const isAuth = useSelector(getUserAuthData); // проверяем залогинен ли
    if (item.authOnly && !isAuth) {
        return null;
    }
    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <AppLink
                    to={item.path}
                    className={classNames(cls.itemRedesigned, {
                        [cls.collapsedRedesigned]: collapsed,
                    })}
                    activeClassName={cls.active}
                >
                    <Icon Svg={item.Icon} />
                    <span className={cls.link}>{t(item.text)}</span>
                </AppLink>
            }
            off={
                <AppLinkDepricated
                    className={classNames(cls.item, {
                        [cls.collapsed]: collapsed,
                    })}
                    theme={AppLinkThem.SECONDARY}
                    to={item.path}
                >
                    <item.Icon className={cls.icon} />
                    <span className={cls.link}>{t(item.text)}</span>
                </AppLinkDepricated>
            }
        />
    );
};

export default SidebarItem;
