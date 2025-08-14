import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Sidebar } from 'widgets/Sidebar';
import React, { useCallback, useState } from 'react';
import Button, { ButtonTheme } from 'shared/ui/Button/Button';
import Modal from 'shared/ui/Modal/Modal';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

const Navbar = (props:NavbarProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);
    const onToggleAuthModal = useCallback(() => {
        setIsAuthModal((prevState) => !prevState);
    }, []);
    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <Button className={cls.links} theme={ButtonTheme.CLEAR_INVERTED} onClick={() => setIsAuthModal(true)}>
                {t('Войти')}
            </Button>
            <Modal isOpen={isAuthModal} onClose={onToggleAuthModal}>
                {/* eslint-disable-next-line max-len */}
                {t('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus adipisci aperiam assumenda at blanditiis consequatur cum dignissimos dolor dolores eum fugit id in iste magnam magni mollitia nesciunt nihil nobis numquam officia, officiis quidem reiciendis rerum soluta temporibus, totam ut. Ad animi culpa debitis, deleniti dolore eius eos eum fugiat fugit nam officiis quasi, qui rem sed voluptatibus? Accusantium harum modi optio possimus ut voluptatum! Animi aperiam architecto atque consequuntur cupiditate deserunt, dolore ducimus est et, eum eveniet expedita, id labore minima necessitatibus nostrum numquam perferendis placeat quaerat quisquam quo repudiandae sunt. Blanditiis eius eos numquam perferendis quisquam, repudiandae sunt.')}
            </Modal>
        </div>
    );
};

export default Navbar;
