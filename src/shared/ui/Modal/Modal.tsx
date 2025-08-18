import { classNames } from 'shared/lib/helpers/classNames/classNames';
import React, {
    useCallback, useEffect, useRef, useState,
} from 'react';
import Portal from 'shared/ui/Portal/Portal';
import { useTheme } from 'app/providers/ThemeProvider';
import cls from './Modal.module.scss';

interface ModalProps {
    className?: string;
    children?: React.ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}
const ANIMATION_DELAY = 300;
const Modal = (props:ModalProps) => {
    const { theme } = useTheme();
    const {
        className,
        children,
        isOpen,
        onClose,
        lazy,
    } = props;
    // для анимации закрытия, иначе модалка без задержки закроется
    const [isClosing, setIsClosing] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        if (isOpen) setIsMounted(true);
    }, [isOpen]);
    const timerRef = useRef<ReturnType<typeof setTimeout>>();
    const closeModal = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, ANIMATION_DELAY);
        }
    }, [onClose]);
    const onKeyDown = useCallback((e: globalThis.KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    }, [closeModal]);
    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown);
        }
        return () => {
            clearTimeout(timerRef.current);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onKeyDown]);
    const mods: Record<string, boolean> = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    };
    const onContentclick = (e:React.MouseEvent) => {
        e.stopPropagation();
    };
    if (lazy && !isMounted) {
        return null;
    }
    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, [className])}>
                <div className={cls.overlay} onClick={closeModal}>
                    <div className={cls.content} onClick={onContentclick}>
                        {children}
                    </div>
                </div>
            </div>
        </Portal>

    );
};

export default Modal;
