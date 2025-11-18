import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RatingCard } from '@/entity/Rating';
import { useGetProfileRating, useRateProfile } from '../../api/profileRatingApi';
import { getUserAuthData } from '@/entity/User';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

export interface ProfileRatingProps {
    className?: string;
    profileId: string;
}

const ProfileRating = memo((props: ProfileRatingProps) => {
    const { className, profileId = '' } = props;
    const { t } = useTranslation('Profile-details');
    const userData = useSelector(getUserAuthData);
    // получение данных с сервера через рткквери
    const { data, isLoading } = useGetProfileRating({
        profileId,
        userId: userData?.id ?? '',
    });
    // получение функции для изменения данных на сервере
    const [rateProfileMutation] = useRateProfile();
    // функция записи на сервер
    const handleRateProfile = useCallback((starsCount:number, feedback?:string) => {
        try {
            // запись на сервер
            rateProfileMutation({
                userId: userData?.id ?? '',
                profileId,
                rate: starsCount,
                feedback,
            });
        } catch (e) {
            // handle error
            console.error(e);
        }
    }, [profileId, rateProfileMutation, userData?.id]);
    const onCancel = useCallback((starsCount:number) => {
        handleRateProfile(starsCount);
    }, [handleRateProfile]);
    const onAccept = useCallback((starsCount:number, feedback?:string) => {
        handleRateProfile(starsCount, feedback);
    }, [handleRateProfile]);
    if (isLoading) {
        return <Skeleton width="100%" height={120} />;
    }
    const rating = data?.[0];
    return (
        <RatingCard
            onAccept={onAccept}
            onCancel={onCancel}
            className={className}
            title={t('Оцените профиль пользователя')}
            feedbackTitle={t('Оставьте свой отзыв о профиле пользователя')}
            hasFeedback
            rate={rating?.rate}
        />
    );
});
export default ProfileRating;
