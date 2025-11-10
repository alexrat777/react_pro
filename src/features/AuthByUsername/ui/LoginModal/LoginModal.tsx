import { Suspense } from 'react';
import Modal from '@/shared/ui/Modal/Modal';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Loader } from '@/shared/ui/Loader';
import { LoginFormAsync } from '../LoginForm/LoginForm.async';

interface LoginModalProps {
    className?: string;
    isOpen?: boolean;
    onClose?: () => void;
}

export const LoginModal = (props:LoginModalProps) => {
    const {
        className,
        isOpen,
        onClose,
    } = props;
    return (
        <Modal
            className={classNames('LoginModal', {}, [className])}
            isOpen={isOpen}
            onClose={onClose}
            lazy
        >
            <Suspense fallback={<Loader />}>
                <LoginFormAsync onSuccess={onClose} />
            </Suspense>

        </Modal>
    );
};
