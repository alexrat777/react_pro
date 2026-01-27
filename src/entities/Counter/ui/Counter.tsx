import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/Button';
import { useCounterActions } from '../model/slice/counterSlice';
import { useCounterValue } from '../model/selectors/getCounterValue/getCounterValue';

export const Counter = () => {
    // для обращения к экшенам
    const dispatch = useDispatch();
    const counterValue = useCounterValue(); // вместо стандартного const counterValue = useSelector(getCounterValue);
    const { add, increment, decrement } = useCounterActions();
    // useCounterActions что бы убрать dispatch(counterActions.increment());
    // const increment = (): void => {
    //     dispatch(counterActions.increment());
    // };
    // const decrement = (): void => {
    //     dispatch(counterActions.decrement());
    // };

    const handleIncrement = (): void => {
        increment();
    };
    const handleDecrement = (): void => {
        decrement();
    };
    const handleAdd = (): void => {
        add(5);
    };
    const { t } = useTranslation();
    return (
        <div>
            <h1 data-testid="value-title">
                {counterValue.value}
            </h1>
            <Button
                onClick={increment}
                data-testid="increment-btn"
            >
                {t('handleIncrement')}
            </Button>
            <Button
                onClick={handleDecrement}
                data-testid="decrement-btn"
            >
                {t('decrement')}
            </Button>
            <Button
                onClick={handleAdd}
                data-testid="Add5-btn"
            >
                {t('Add5')}
            </Button>
        </div>
    );
};
