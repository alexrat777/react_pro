import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { ListBox } from 'shared/ui/ListBox/ListBox';
import { Currency } from '../../model/types/currency';

interface CurrencySelectProps {
    className?: string;
    value?: Currency;
    onChange?: (value: any) => void;
    readOnly?: boolean;
}
const options = [
    { value: Currency.RUB, content: Currency.RUB },
    { value: Currency.EUR, content: Currency.EUR },
    { value: Currency.USD, content: Currency.USD },
];
export const CurrencySelect = memo((props:CurrencySelectProps) => {
    const {
        className, value, onChange, readOnly,
    } = props;
    const { t } = useTranslation('profile');
    const onChangeHandler = useCallback((value:string) => {
        onChange?.(value as Currency);
    }, [onChange]);

    return (
        <ListBox
            onChange={onChangeHandler}
            value={value}
            label={t('Укажите валюту')}
            items={options}
            readOnly={readOnly}
            direction="top right"
        />
    );
    // return (
    //     <Select
    //         className={classNames('', {}, [className])}
    //         label={t('Укажите валюту')}
    //         onChange={onChangeHandler}
    //         value={value}
    //         options={options}
    //         readOnly={readOnly}
    //     />
    //
    // );
});
