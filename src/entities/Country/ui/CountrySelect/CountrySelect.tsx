import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { Country } from '../../model/types/country';
import { ToggleFeatures } from '@/shared/lib/features';
import { ListBox } from '@/shared/ui/redesigned/Popups';

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
export const CountrySelect = memo((props: CountrySelectProps) => {
    const { className, value, onChange, readOnly } = props;
    const { t } = useTranslation('profile');
    const onChangeHandler = useCallback(
        (value: string) => {
            onChange?.(value as Country);
        },
        [onChange],
    );

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <ListBox
                    onChange={onChangeHandler}
                    value={value}
                    label={t('Укажите страну')}
                    items={options}
                    readonly={readOnly}
                    direction="top right"
                />
            }
            off={
                <ListBoxDeprecated
                    onChange={onChangeHandler}
                    value={value}
                    label={t('Укажите страну')}
                    items={options}
                    readOnly={readOnly}
                    direction="top right"
                />
            }
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
