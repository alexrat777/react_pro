import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleView } from 'entity/Article';

// наследуюем для того что бы можно было работать с нормальизованными данными extends EntityState<Article>
export interface ArticlePageSchema extends EntityState<Article>{
    isLoading?: boolean;
    error?: string;

    view: ArticleView;
    // pagination
    page: number;
    limit?:number;
    hasMore: boolean;

    _inited: boolean; // флаг инициализации
}
