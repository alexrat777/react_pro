// import { classNames } from 'shared/lib/helpers/classNames/classNames';
// import { useTranslation } from 'react-i18next';
import { Fragment, memo, ReactNode } from 'react';
import { Listbox as HListbox } from '@headlessui/react';
import CheckIcon from 'shared/assets/icons/check-mark.svg';
import { classNames, Mods } from 'shared/lib/helpers/classNames/classNames';
import { DropdownDirection } from 'shared/types/ui';
import { Button } from '../../../Button/Button';
import { HStack } from '../../../Stack';
import { Icon } from '../../../Icon/Icon';
import cls from './ListBox.module.scss';
import { mapDirectionClass } from '../../styles/const';
import popupCls from '../../styles/popup.module.scss';

export interface ListBoxItem{
    value: string;
    content: ReactNode;
    disabled?: boolean;
}
interface ListBoxProps {
    className?: string;
    items?:ListBoxItem[];
    value?: string;
    defaultValue?: string;
    onChange: <T extends string>(value: T) => void;
    label?: string;
    readOnly?: boolean;
    direction?: DropdownDirection;
}

export const ListBox = memo((props:ListBoxProps) => {
    const {
        className, items, value, defaultValue, onChange, label, readOnly, direction = 'bottom right',
    } = props;
    const optionsClasses = [mapDirectionClass[direction]];
    const mods: Mods = {
        [popupCls.disabled]: readOnly,
    };
    return (
        <HStack gap="4">
            {label && (
                <span className={classNames('', mods, [])}>
                    {`${label}>`}
                </span>
            )}
            <HListbox
                disabled={readOnly}
                as="div"
                className={classNames(cls.ListBox, {}, [className, popupCls.popup])}
                value={value}
                onChange={onChange}
            >
                <HListbox.Button className={popupCls.trigger} disabled={readOnly}>
                    <Button disabled={readOnly}>
                        {value ?? defaultValue}
                    </Button>
                </HListbox.Button>
                <HListbox.Options className={classNames(cls.options, {}, optionsClasses)}>
                    {items?.map((item) => (
                        <HListbox.Option
                            key={item.value}
                            value={item.value}
                            disabled={item.disabled}
                            as={Fragment}
                        >

                            {({ active, selected }) => (
                                <li
                                    className={classNames(cls.item, {
                                        [popupCls.active]: active,
                                        [popupCls.disabled]: item.disabled,
                                    })}
                                >
                                    <HStack gap="8">
                                        {selected && <Icon Svg={CheckIcon} />}
                                        {item.content}
                                    </HStack>
                                </li>

                            )}

                        </HListbox.Option>
                    ))}
                </HListbox.Options>
            </HListbox>
        </HStack>

    );
});
