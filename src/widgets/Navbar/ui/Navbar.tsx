import { classNames } from 'shared/lib/helpers/classNames/classNames';
import AppLink, { AppLinkThem } from 'shared/ui/AppLink/AppLink';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { useTranslation } from 'react-i18next';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

const Navbar = (props:NavbarProps) => {
    const { className } = props;
    const { t } = useTranslation();
    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <div className={cls.links}>
                <AppLink theme={AppLinkThem.SECONDARY} to="/" className={cls.mainLink}>{t('Главная')}</AppLink>
                <AppLink theme={AppLinkThem.SECONDARY} to="/about">{t('О сайте')}</AppLink>
            </div>
        </div>
    );
};

export default Navbar;
