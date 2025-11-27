import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/Button';
// Компонент для тестирования ErrorBoundary
const BugButton = () => {
    const [error, setError] = useState(false);
    const { t } = useTranslation();

    const OnTrow = () => setError(true);

    useEffect(() => {
        if (error) throw new Error();
    }, [error]);

    return (
        <Button onClick={OnTrow}>
            {t('Создать ошибку')}
        </Button>
    );
};

export default BugButton;
