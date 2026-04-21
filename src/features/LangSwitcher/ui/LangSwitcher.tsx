import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned/Button';

interface LangSwitcherProps {
    className?: string;
    short?: boolean;
}

export const LangSwitcher = memo((props: LangSwitcherProps) => {
    const { className, short } = props;
    const { t, i18n } = useTranslation();
    const toggle = () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Button variant="clear" onClick={toggle}>
                    {t(short ? 'сокрЯз' : 'Язык')}
                </Button>
            }
            off={
                <ButtonDeprecated
                    className={classNames('', {}, [className])}
                    theme={ButtonTheme.CLEAR}
                    onClick={toggle}
                >
                    {t(short ? 'сокрЯз' : 'Язык')}
                </ButtonDeprecated>
            }
        />
    );
});
