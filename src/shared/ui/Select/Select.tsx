import { useTranslation } from 'react-i18next';
import { ChangeEvent, useMemo } from 'react';
import { classNames, Mods } from '@/shared/lib/helpers/classNames/classNames';
import cls from './Select.module.scss';
// исправил компонент добавив дженерик
export interface SelectOption<T extends string> {
    value: T;
    content: string;
}
interface SelectProps<T extends string> {
    className?: string;
    label?:string;
    options?: SelectOption<T>[];
    value?: T;
    readOnly?: boolean;
    onChange?: (value: T) => void;
}

export const Select = <T extends string>(props:SelectProps<T>) => {
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
        if (onChange) onChange(e.target.value as T);
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
};
