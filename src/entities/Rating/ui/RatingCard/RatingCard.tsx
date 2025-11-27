import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Card } from '@/shared/ui/Card';
import { HStack, VStack } from '@/shared/ui/Stack';
import { StarRating } from '@/shared/ui/StarRating';
import { Text } from '@/shared/ui/Text';
import Modal from '@/shared/ui/Modal';
import Input from '@/shared/ui/Input';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import { Drawer } from '@/shared/ui/Drawer';

interface RatingCardProps {
    className?: string;
    title: string;
    feedbackTitle?: string;
    hasFeedback?: boolean;
    onCancel?: (starsCount:number) => void;
    onAccept?: (starsCount:number, feedback?:string) => void;
    rate?: number;
}

export const RatingCard = memo((props: RatingCardProps) => {
    const {
        className,
        title,
        feedbackTitle,
        hasFeedback,
        onAccept,
        onCancel,
        rate = 0,
    } = props;
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starCount, setStarCount] = useState(rate);
    const [feedback, setFeedback] = useState('');
    const onSelectStars = useCallback((selectedStarCount:number) => {
        // установить выбраное количество звезд
        setStarCount(selectedStarCount);
        // если нужен фитбек то показать модалку иначе запустить колбек onAccept с данными о выбранных звездах
        if (hasFeedback) {
            setIsModalOpen(true);
        } else {
            onAccept?.(starCount);
        }
    }, [hasFeedback, onAccept, starCount]);
    const acceptHandle = useCallback(() => {
        setIsModalOpen(false);
        onAccept?.(starCount, feedback);
    }, [feedback, onAccept, starCount]);

    const cancelHandle = useCallback(() => {
        setIsModalOpen(false);
        onCancel?.(starCount);
    }, [onCancel, starCount]);
    const modalContent = (
        <>
            <Text
                title={feedbackTitle}
            />
            <Input
                value={feedback}
                onChange={setFeedback}
                placeholder={t('Ваш отзыв')}
                maxWidth
            />
        </>

    );
    return (
        <Card className={className} max>
            <VStack align="center" gap="8">
                <Text title={starCount ? t('Спасибо за оценку!') : title} />
                <StarRating selectedStars={starCount} size={40} onSelect={onSelectStars} />
            </VStack>
            <BrowserView>
                <Modal isOpen={isModalOpen} lazy>
                    <VStack max gap="32">
                        {modalContent}
                        <HStack max gap="16" justify="end">
                            <Button onClick={cancelHandle} theme={ButtonTheme.OUTLINE_RED}>
                                {t('Закрыть')}
                            </Button>
                            <Button onClick={acceptHandle}>
                                {t('Отправить')}
                            </Button>
                        </HStack>
                    </VStack>

                </Modal>
            </BrowserView>
            <MobileView>
                <Drawer lazy isOpen={isModalOpen} onClose={cancelHandle}>
                    <VStack max gap="32">
                        {modalContent}
                        <Button
                            onClick={acceptHandle}
                            size={ButtonSize.L}
                            fullWidth
                        >
                            {t('Отправить')}
                        </Button>
                    </VStack>
                </Drawer>
            </MobileView>

        </Card>
    );
});
