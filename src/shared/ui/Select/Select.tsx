import { classNames, Mods } from 'shared/lib/helpers/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { ChangeEvent, memo, useMemo } from 'react';
import cls from './Select.module.scss';

export interface SelectOption {
    value: string;
    content: string;
}
interface SelectProps {
    className?: string;
    label?:string;
    options?: SelectOption[];
    value?: string;
    readOnly?: boolean;
    onChange?: (value: string) => void;
}

export const Select = memo((props:SelectProps) => {
    const {
        className,
        label,
        options,
        value,
        onChange,
        readOnly,
    } = props;
    const { t } = useTranslation();
    const onChangeHandler = (e:ChangeEvent<HTMLSelectElement>) => {
        if (onChange) onChange(e.target.value);
    };
    const optionList = useMemo(() => options?.map((opt) => (
        <option
            className={cls.option}
            value={opt.value}
            key={opt.value}
        >
            {opt.content}
        </option>
    )), [options]);
    const mods: Mods = {
        [cls.readOnly]: readOnly,
    };
    return (
        <div className={classNames(cls.Wrapper, mods, [className])}>
            <div className={cls.label}>
                {label && (
                    <span className={cls.label}>
                        {`${label}>`}
                    </span>
                )}
                <select
                    className={cls.select}
                    value={value}
                    onChange={onChangeHandler}
                    disabled={readOnly}
                >
                    {optionList}
                </select>
            </div>
        </div>
    );
});
