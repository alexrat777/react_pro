import {
    useCallback, useEffect, useRef, useState,
} from 'react';

interface UseModalProps {
    onClose?: () => void;
    isOpen: boolean;
    animationDelay:number;
}
export function useModal({ onClose, isOpen, animationDelay }: UseModalProps) {
    // для анимации закрытия, иначе модалка без задержки закроется
    const [isClosing, setIsClosing] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        if (isOpen) setIsMounted(true);
    }, [isOpen]);
    const timerRef = useRef<ReturnType<typeof setTimeout>>();
    const close = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, animationDelay);
        }
    }, [animationDelay, onClose]);
    const onKeyDown = useCallback((e: globalThis.KeyboardEvent) => {
        if (e.key === 'Escape') {
            close();
        }
    }, [close]);
    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown);
        }
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onKeyDown]);
    return { isClosing, isMounted, close };
}
