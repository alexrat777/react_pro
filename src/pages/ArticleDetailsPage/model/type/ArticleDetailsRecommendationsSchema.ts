import { EntityState } from '@reduxjs/toolkit';
import { Comment } from '@/entity/Comment';
import { Article } from '@/entity/Article';
// наследуюем для того что бы можно было работать с нормальизованными данными extends EntityState<Comment>
export interface ArticleDetailsRecommendationsSchema extends EntityState<Article>{
    isLoading?: boolean;
    error?: string;
}
