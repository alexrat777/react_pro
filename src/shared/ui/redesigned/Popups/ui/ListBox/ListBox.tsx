// import { classNames } from 'shared/lib/helpers/classNames/classNames';
// import { useTranslation } from 'react-i18next';
import { Fragment, ReactNode, useMemo } from 'react';
import { Listbox as HListbox } from '@headlessui/react';
import CheckIcon from '@/shared/assets/icons/check-mark.svg';
import { classNames, Mods } from '@/shared/lib/helpers/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';
import { Button } from '../../../Button/Button';
import { HStack } from '../../../../redesigned/Stack';
import { Icon } from '../../../Icon/Icon';
import cls from './ListBox.module.scss';
import { mapDirectionClass } from '../../styles/const';
import popupCls from '../../styles/popup.module.scss';

export interface ListBoxItem<T extends string> {
    value: T;
    content: ReactNode;
    disabled?: boolean;
}
interface ListBoxProps<T extends string> {
    className?: string;
    items?: ListBoxItem<T>[];
    value?: T;
    defaultValue?: T;
    onChange: (value: T) => void;
    label?: string;
    readOnly?: boolean;
    direction?: DropdownDirection;
}

export function ListBox<T extends string>(props: ListBoxProps<T>) {
    const {
        className,
        items,
        value,
        defaultValue,
        onChange,
        label,
        readOnly,
        direction = 'bottom right',
    } = props;
    const optionsClasses = [mapDirectionClass[direction], popupCls.menu];
    const mods: Mods = {
        [popupCls.disabled]: readOnly,
    };
    const selectedItem = useMemo(() => {
        return items?.find((item) => item.value === value);
    }, [items, value]);
    return (
        <HStack gap="4">
            {label && (
                <span className={classNames('', mods, [])}>{`${label}>`}</span>
            )}
            <HListbox
                disabled={readOnly}
                as="div"
                className={classNames(cls.ListBox, {}, [
                    className,
                    popupCls.popup,
                ])}
                value={value}
                onChange={onChange}
            >
                <HListbox.Button
                    className={popupCls.trigger}
                    disabled={readOnly}
                >
                    <Button variant="filled" disabled={readOnly}>
                        {selectedItem?.content ?? defaultValue}
                    </Button>
                </HListbox.Button>
                <HListbox.Options
                    className={classNames(cls.options, {}, optionsClasses)}
                >
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
                                        [popupCls.selected]: selected,
                                    })}
                                >
                                    <HStack gap="8">
                                        {selected && (
                                            <Icon
                                                width={20}
                                                height={20}
                                                Svg={CheckIcon}
                                                className={classNames(
                                                    cls.IconSelected,
                                                )}
                                            />
                                        )}
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
}
