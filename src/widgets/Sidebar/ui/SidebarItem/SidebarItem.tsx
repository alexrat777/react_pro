import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useTranslation } from 'react-i18next';
import AppLink, { AppLinkThem } from 'shared/ui/AppLink/AppLink';
import { SidebarItemType } from '../../model/items';
import cls from './SidebarItem.module.scss';

interface SidebarItemProps {
    item:SidebarItemType;
    collapsed: boolean;
}

const SidebarItem = (props:SidebarItemProps) => {
    const { item, collapsed } = props;
    const { t } = useTranslation();
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
