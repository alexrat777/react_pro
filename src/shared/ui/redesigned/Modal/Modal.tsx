import React from 'react';
import { classNames, Mods } from '@/shared/lib/helpers/classNames/classNames';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import { Overlay } from '../Overlay/Overlay';
import Portal from '../Portal/Portal';
import cls from './Modal.module.scss';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { toggleFeatures } from '@/shared/lib/features';

interface ModalProps {
    className?: string;
    children?: React.ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}
const ANIMATION_DELAY = 300;
const Modal = (props: ModalProps) => {
    const { theme } = useTheme();
    const { className, children, isOpen = false, onClose, lazy } = props;
    const { isClosing, isMounted, close } = useModal({
        onClose,
        isOpen,
        animationDelay: ANIMATION_DELAY,
    });

    const mods: Mods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    };
    if (lazy && !isMounted) {
        return null;
    }
    return (
        <Portal element={document.getElementById('app') ?? document.body}>
            <div
                className={classNames(cls.Modal, mods, [
                    className,
                    theme,
                    'app_modal',
                    toggleFeatures({
                        name: 'isAppRedesigned',
                        on: () => cls.modalNew,
                        off: () => cls.modalOld,
                    }),
                ])}
            >
                <Overlay onClick={close} />
                <div className={cls.content}>{children}</div>
            </div>
        </Portal>
    );
};

export default Modal;
