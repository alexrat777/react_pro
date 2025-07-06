import {classNames} from "shared/lib/helpers/classNames/classNames";
import cls from './AppLink.module.scss'
import {Link} from "react-router-dom";
import {FC} from "react";

export enum AppLinkThem {
    PRIMARY = "primary",
    SECONDARY = "secondary"
}


interface AppLinkProps {
    className?: string;
    to?:string;
    theme?:AppLinkThem;

}

const AppLink:FC<AppLinkProps> = (props) => {
    const  {
        to,
        className,
        children,
        theme = AppLinkThem.PRIMARY,
        ...otherProps
    } = props;
    return (
        <Link
            className={classNames(cls.AppLink,{},[className,cls[theme]])}
            to={to}
            {...otherProps}
        >
            {children}
        </Link>
    );
};

export default AppLink;