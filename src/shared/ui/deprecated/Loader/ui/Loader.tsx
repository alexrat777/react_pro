import { memo } from 'react';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import './Loader.scss';

interface LoaderProps {
    className?: string;
}
/**
 * Устарел, используем новые из папки redesigned
 * @deprecated
 */
export const Loader = memo(({ className }: LoaderProps) => (
    <div className={classNames('lds-ellipsis', {}, [className])}>
        <div />
        <div />
        <div />
        <div />
    </div>
));
