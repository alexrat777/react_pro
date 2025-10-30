import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { memo, useCallback } from 'react';
import { Dropdown } from 'shared/ui/Popups';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useDispatch, useSelector } from 'react-redux';
import {
    getUserAuthData, isUserAdmin, isUserManager, userActions,
} from 'entity/User';
import { useTranslation } from 'react-i18next';
import { Avatar } from 'shared/ui/Avatar/Avatar';

interface AvatarDropdownProps {
    className?: string;
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
    const { className } = props;
    const authData = useSelector(getUserAuthData);
    const isAdmin = useSelector(isUserAdmin);
    const isManager = useSelector(isUserManager);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);
    const isAdminPanelAvailibale = isAdmin || isManager;
    if (!authData) { return null; }
    return (
        <Dropdown
            direction="bottom left"
            className={classNames('', {}, [className])}
            items={[
                // условное добавление в массив значение или не добавление js () для тернарного выражение нужны ... разварачивание массива в элементы
                ...(isAdminPanelAvailibale ? [{
                    content: t('Админка'),
                    href: RoutePath.admin_panel,
                }] : []),
                {
                    content: t('Профиль'),
                    href: RoutePath.profile + authData.id,
                },
                {
                    content: t('Выйти'),
                    onClick: onLogout,
                },
            ]}
            trigger={<Avatar size={30} src={authData.avatar} />}
        />
    );
});
