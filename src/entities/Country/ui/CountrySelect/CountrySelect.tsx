import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Select } from '@/shared/ui/Select/Select';
import { ListBox } from '@/shared/ui/Popups/ui/ListBox/ListBox';
import { Country } from '../../model/types/country';

interface CountrySelectProps {
    className?: string;
    value?: Country;
    onChange?: (value: Country) => void;
    readOnly?: boolean;
}
const options = [
    { value: Country.Armenia, content: Country.Armenia },
    { value: Country.Belarus, content: Country.Belarus },
    { value: Country.Kazakhstan, content: Country.Kazakhstan },
    { value: Country.Russia, content: Country.Russia },
    { value: Country.Ukraine, content: Country.Ukraine },

];
export const CountrySelect = memo((props:CountrySelectProps) => {
    const {
        className, value, onChange, readOnly,
    } = props;
    const { t } = useTranslation('profile');
    const onChangeHandler = useCallback((value:string) => {
        onChange?.(value as Country);
    }, [onChange]);

    return (
        <ListBox
            onChange={onChangeHandler}
            value={value}
            label={t('Укажите страну')}
            items={options}
            readOnly={readOnly}
            direction="top right"
        />
    );

    // return (
    //     <Select
    //         className={classNames('', {}, [className])}
    //         label={t('Укажите страну')}
    //         onChange={onChangeHandler}
    //         value={value}
    //         options={options}
    //         readOnly={readOnly}
    //     />
    //
    // );
});
