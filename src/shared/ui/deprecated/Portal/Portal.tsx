import { createPortal } from 'react-dom';
import { ReactNode } from 'react';

interface PortalProps {
    children: ReactNode;
    element?: HTMLElement;
}
/**
 * Устарел, используем новые из папки redesigned
 * @deprecated
 */
const Portal = (props: PortalProps) => {
    const { children, element = document.body } = props;
    return createPortal(children, element);
};

export default Portal;
