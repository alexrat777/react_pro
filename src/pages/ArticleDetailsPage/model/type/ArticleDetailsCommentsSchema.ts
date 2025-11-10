import { EntityState } from '@reduxjs/toolkit';
import { Comment } from '@/entity/Comment';
// наследуюем для того что бы можно было работать с нормальизованными данными extends EntityState<Comment>
export interface ArticleDetailsCommentsSchema extends EntityState<Comment>{
    isLoading?: boolean;
    error?: string;
}
