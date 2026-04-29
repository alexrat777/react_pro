import { useTranslation } from 'react-i18next';
import {
    ImgHTMLAttributes,
    memo,
    ReactElement,
    useLayoutEffect,
    useState,
} from 'react';

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
    fallback?: ReactElement;
    errorFallback?: ReactElement;
}

export const AppImage = memo((props: AppImageProps) => {
    const {
        className,
        alt = 'image',
        src,
        fallback,
        errorFallback,
        ...otherProps
    } = props;
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    // useLayoutEffect для вызова до того как компонент вмонтировался в дом
    useLayoutEffect(() => {
        const img = new Image();
        img.src = src ?? '';
        img.onload = () => {
            setIsLoading(false);
        };
        img.onerror = (ev) => {
            setHasError(true);
            setIsLoading(false);
            console.log(ev);
        };
    }, [src]);
    if (isLoading && fallback) {
        return fallback;
    }
    if (hasError && errorFallback) {
        return errorFallback;
    }
    return <img className={className} alt={alt} src={src} {...otherProps} />;
});
