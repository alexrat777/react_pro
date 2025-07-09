import {classNames} from "shared/lib/helpers/classNames/classNames";
import cls from './Navbar.module.scss'
import AppLink, {AppLinkThem} from "shared/ui/AppLink/AppLink";
import {ThemeSwitcher} from "widgets/ThemeSwitcher";

interface NavbarProps {
    className?: string;
}

const Navbar = (props:NavbarProps) => {
    const  {className} = props;
    return (
        <div className={classNames(cls.Navbar,{},[className])}>
            <ThemeSwitcher />
            <div className={cls.links}>
                <AppLink theme={AppLinkThem.SECONDARY} to={'/'} className={cls.mainLink}>Главная</AppLink>
                <AppLink theme={AppLinkThem.SECONDARY} to={'/about'}>О сайте</AppLink>
            </div>
        </div>
    );
};

export default Navbar;

