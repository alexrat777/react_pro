import { lazy, Suspense } from 'react';
import type { ProfileRatingProps } from './ProfileRating';
import { Skeleton } from '@/shared/ui/Skeleton';

const ProfileRatingLazy = lazy(() => import('./ProfileRating'));

export const ProfileRatingAsync = (props:ProfileRatingProps) => {
    return (
        <Suspense fallback={<Skeleton width="100%" height={140} />}>
            <ProfileRatingLazy {...props} />
        </Suspense>
    );
};
