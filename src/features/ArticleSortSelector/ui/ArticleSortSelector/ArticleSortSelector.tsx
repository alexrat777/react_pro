import { useTranslation } from 'react-i18next';
import { memo, useMemo } from 'react';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Select, SelectOption } from '@/shared/ui/deprecated/Select';
import { SortOrder } from '@/shared/types/sort';
import cls from './ArticleSortSelector.module.scss';
import { ArticleSortField } from '@/entities/Article';
import { ToggleFeatures } from '@/shared/lib/features';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

interface ArticleSortSelectorProps {
    className?: string;
    sort: ArticleSortField;
    order: SortOrder;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newSort: ArticleSortField) => void;
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
    const { className, sort, order, onChangeSort, onChangeOrder } = props;
    const { t } = useTranslation('article');
    // описываем массивы сортировок
    const orderOptions = useMemo<SelectOption<SortOrder>[]>(
        () => [
            {
                content: t('возрастанию'),
                value: 'asc',
            },
            {
                content: t('убыванию'),
                value: 'desc',
            },
        ],
        [t],
    );
    const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(
        () => [
            {
                content: t('дате создания'),
                value: ArticleSortField.CREATED,
            },
            {
                content: t('названию'),
                value: ArticleSortField.TITLE,
            },
            {
                content: t('просмотрам'),
                value: ArticleSortField.VIEWS,
            },
        ],
        [t],
    );

    // const onChangeSortHandler = useCallback((newSort:string) => {
    //     onChangeSort(newSort as ArticleSortField);
    // }, [onChangeSort]);
    //
    // const onChangeOrderHandler = useCallback((newOrder:string) => {
    //     onChangeOrder(newOrder as SortOrder);
    // }, [onChangeOrder]);

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <div
                    className={classNames(
                        cls.ArticleSortSelectorRedesigned,
                        {},
                        [className],
                    )}
                >
                    <VStack gap="8">
                        <Text title={t('Сортировать по:')} />
                        <ListBox
                            items={sortFieldOptions}
                            value={sort}
                            onChange={onChangeSort}
                        />
                        <ListBox
                            items={orderOptions}
                            value={order}
                            onChange={onChangeOrder}
                        />
                    </VStack>
                </div>
            }
            off={
                <div
                    className={classNames(cls.ArticleSortSelector, {}, [
                        className,
                    ])}
                >
                    <Select<ArticleSortField> // указать дженерик напрямую
                        options={sortFieldOptions}
                        label={t('Сортировать ПО')}
                        value={sort}
                        onChange={onChangeSort}
                    />
                    <Select
                        options={orderOptions}
                        label={t('по')}
                        value={order}
                        onChange={onChangeOrder}
                    />
                </div>
            }
        />
    );
});
