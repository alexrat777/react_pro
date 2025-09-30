import { EntityState } from '@reduxjs/toolkit';
import {
    Article, ArticleSortField, ArticleView, ArticleType,
} from 'entity/Article';
import { SortOrder } from 'shared/types/sort';

// наследуюем для того что бы можно было работать с нормальизованными данными extends EntityState<Article>
export interface ArticlesPageSchema extends EntityState<Article>{
    isLoading?: boolean;
    error?: string;

    // pagination
    page: number;
    limit?:number;
    hasMore: boolean;
    // фильтры
    view: ArticleView;
    order: SortOrder;
    sort: ArticleSortField;
    search: string;
    type:ArticleType;

    _inited: boolean; // флаг инициализации
}
