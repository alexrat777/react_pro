import {classNames} from "shared/lib/helpers/classNames/classNames";
import cls from './Sidebar.module.scss'
import {useState} from "react";
import {ThemeSwitcher} from "widgets/ThemeSwitcher";
interface SidebarProps {
    className?: string;
}

const Sidebar = (props:SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false)
    const  {className} = props;

    const onToggle = () => {
        setCollapsed(prev => !prev)
    }
    return (
        <div className={classNames(cls.Sidebar,{[cls.collapsed]:collapsed},[className])}>
            <button onClick={onToggle}>toggle</button>
            <div className={cls.switchers}>
                <ThemeSwitcher />
                {/*LangSwitcher*/}

            </div>
        </div>
    );
};

export default Sidebar;