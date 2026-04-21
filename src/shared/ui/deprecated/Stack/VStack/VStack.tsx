import { Flex, FlexProps } from '../Flex/Flex';

type VStackProps = Omit<FlexProps, 'direction'>;
/**
 * Устарел, используем новые из папки redesigned
 * @deprecated
 */
export const VStack = (props: VStackProps) => {
    const { align = 'start', ...otherProps } = props;
    return <Flex direction="column" align={align} {...otherProps} />;
};
