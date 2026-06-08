import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Text as TextDepreacetd } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { StarRating } from '@/shared/ui/deprecated/StarRating';
import Modal from '@/shared/ui/redesigned/Modal';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Input } from '@/shared/ui/redesigned/Input';
import {
    Button as ButtonDeprecated,
    ButtonSize,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';

interface RatingCardProps {
    className?: string;
    title: string;
    feedbackTitle?: string;
    hasFeedback?: boolean;
    onCancel?: (starsCount: number) => void;
    onAccept?: (starsCount: number, feedback?: string) => void;
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
    const onSelectStars = useCallback(
        (selectedStarCount: number) => {
            // установить выбраное количество звезд
            setStarCount(selectedStarCount);
            // если нужен фитбек то показать модалку иначе запустить колбек onAccept с данными о выбранных звездах
            if (hasFeedback) {
                setIsModalOpen(true);
            } else {
                onAccept?.(starCount);
            }
        },
        [hasFeedback, onAccept, starCount],
    );
    const acceptHandle = useCallback(() => {
        setIsModalOpen(false);
        onAccept?.(starCount, feedback);
    }, [feedback, onAccept, starCount]);

    const cancelHandle = useCallback(() => {
        setIsModalOpen(false);
        onCancel?.(starCount);
    }, [onCancel, starCount]);
    const modalContent = (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <>
                    <Text title={feedbackTitle} />
                    <Input
                        data-testid="RatingCard.Input"
                        value={feedback}
                        onChange={setFeedback}
                        placeholder={t('Ваш отзыв')}
                    />
                </>
            }
            off={
                <>
                    <TextDepreacetd title={feedbackTitle} />
                    <InputDeprecated
                        data-testid="RatingCard.Input"
                        value={feedback}
                        onChange={setFeedback}
                        placeholder={t('Ваш отзыв')}
                        maxWidth
                    />
                </>
            }
        />
    );
    const content = (
        <>
            <VStack align="center" gap="8">
                <ToggleFeatures
                    feature="isAppRedesigned"
                    on={
                        <Text
                            title={starCount ? t('Спасибо за оценку!') : title}
                        />
                    }
                    off={
                        <TextDepreacetd
                            title={starCount ? t('Спасибо за оценку!') : title}
                        />
                    }
                />
                <StarRating
                    selectedStars={starCount}
                    size={40}
                    onSelect={onSelectStars}
                />
            </VStack>
            <BrowserView>
                <Modal isOpen={isModalOpen} lazy>
                    <VStack max gap="32">
                        {modalContent}
                        <ToggleFeatures
                            feature="isAppRedesigned"
                            on={
                                <HStack max gap="16" justify="end">
                                    <Button
                                        data-testid="RatingCard.Close"
                                        onClick={cancelHandle}
                                    >
                                        {t('Закрыть')}
                                    </Button>
                                    <Button
                                        onClick={acceptHandle}
                                        data-testid="RatingCard.Send"
                                    >
                                        {t('Отправить')}
                                    </Button>
                                </HStack>
                            }
                            off={
                                <ToggleFeatures
                                    feature="isAppRedesigned"
                                    on={
                                        <HStack max gap="16" justify="end">
                                            <Button
                                                data-testid="RatingCard.Close"
                                                onClick={cancelHandle}
                                                size="l"
                                            >
                                                {t('Закрыть')}
                                            </Button>
                                            <Button
                                                onClick={acceptHandle}
                                                data-testid="RatingCard.Send"
                                                size="l"
                                            >
                                                {t('Отправить')}
                                            </Button>
                                        </HStack>
                                    }
                                    off={
                                        <HStack max gap="16" justify="end">
                                            <ButtonDeprecated
                                                data-testid="RatingCard.Close"
                                                onClick={cancelHandle}
                                                theme={ButtonTheme.OUTLINE_RED}
                                            >
                                                {t('Закрыть')}
                                            </ButtonDeprecated>
                                            <ButtonDeprecated
                                                onClick={acceptHandle}
                                                data-testid="RatingCard.Send"
                                            >
                                                {t('Отправить')}
                                            </ButtonDeprecated>
                                        </HStack>
                                    }
                                />
                            }
                        />
                    </VStack>
                </Modal>
            </BrowserView>
            <MobileView>
                <Drawer lazy isOpen={isModalOpen} onClose={cancelHandle}>
                    <VStack max gap="32">
                        {modalContent}
                        <ButtonDeprecated
                            onClick={acceptHandle}
                            size={ButtonSize.L}
                            fullWidth
                        >
                            {t('Отправить')}
                        </ButtonDeprecated>
                    </VStack>
                </Drawer>
            </MobileView>
        </>
    );

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Card
                    padding="24"
                    border="partial"
                    className={className}
                    max
                    data-testid="RatingCard"
                >
                    {content}
                </Card>
            }
            off={
                <CardDeprecated
                    className={className}
                    max
                    data-testid="RatingCard"
                >
                    {content}
                </CardDeprecated>
            }
        />
    );
});
