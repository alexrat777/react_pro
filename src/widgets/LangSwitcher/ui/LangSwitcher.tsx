import { useTranslation } from 'react-i18next';
import React from 'react';
import Button, { ButtonTheme } from 'shared/ui/Button/Button';
import { classNames } from 'shared/lib/helpers/classNames/classNames';

interface LangSwitcherProps {
    className?: string;
    short?: boolean;
}

export const LangSwitcher = (props:LangSwitcherProps) => {
    const { className, short } = props;
    const { t, i18n } = useTranslation();
    const toggle = () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return (
        <Button
            className={classNames('', {}, [className])}
            theme={ButtonTheme.CLEAR}
            onClick={toggle}
        >
            {t(short ? 'сокрЯз' : 'Язык')}
        </Button>
    );
};
