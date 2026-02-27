// загрузка линивая библиотек

import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

// получаем типы библиотек
type SpringType = typeof import('@react-spring/web');
type GestureType = typeof import('@use-gesture/react');
// описание типа контекста что в нем будет содержатся
interface AnimationContextPayload {
    Gesture?: GestureType;
    Spring?: SpringType;
    isLoaded?: boolean;
}

// создаем конекст для оборачивания
const AnimationContext = createContext<AnimationContextPayload>({});

// функция для подтягивания асинхронно библиотек
const getAsyncAnimationModules = async () => {
    /// вернет массив всех промисов которые параллельно отработали
    return Promise.all([
        import('@react-spring/web'),
        import('@use-gesture/react'),
    ]);
};
export const useAnimationLibs = () => {
    // обернуть что б не useContext использовать а напрямую AnimationContextPayload через развертывание
    return useContext(AnimationContext) as Required<AnimationContextPayload>; // скастовали для удобства, но надо всегда проверять isLoading!
};
export const AnimationProvider = ({ children }: { children: ReactNode }) => {
    // создаем рефы что бы минимизировать перерисовку и получать доступ при рендеренге!!
    const SpringRef = useRef<SpringType>();
    const GestureRef = useRef<GestureType>();
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        getAsyncAnimationModules().then(([Spring, Gesture]) => {
            // записываем в рефы ссылки на подгруженные библиотеки
            SpringRef.current = Spring;
            GestureRef.current = Gesture;
            // статус загружены
            setIsLoaded(true);
        });
    }, []);
    // мемозируем для перересовки
    const value = useMemo(
        () => ({
            Gesture: GestureRef.current,
            Spring: SpringRef.current,
            isLoaded,
        }),
        [isLoaded],
    );
    return (
        <AnimationContext.Provider value={value}>
            {children}
        </AnimationContext.Provider>
    );
};
