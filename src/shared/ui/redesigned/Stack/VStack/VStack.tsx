import { Flex, FlexProps } from '../Flex/Flex';

type VStackProps = Omit<FlexProps, 'direction'>;
export const VStack = (props: VStackProps) => {
    const { align = 'start', ...otherProps } = props;
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Flex direction="column" align={align} {...otherProps} />;
};
