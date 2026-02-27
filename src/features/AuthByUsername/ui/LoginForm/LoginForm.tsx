import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import Input from '@/shared/ui/Input';
import { Text, TextTheme } from '@/shared/ui/Text';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import DynamicModuleLoader, {
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getLoginUserName } from '../../model/selectors/getLoginUserName/getLoginUserName';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';

export interface LoginFormProps {
    className?: string;
    onSuccess?: () => void;
}
const initialReducers: ReducersList = {
    // постоянный не будет пересчитывать и перересовка лишняя
    loginForm: loginReducer,
};
const LoginForm = memo((props: LoginFormProps) => {
    const { className, onSuccess } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const onChangeUsername = useCallback(
        (value: string) => {
            // деспатчим экшен изменения значения username стейта логин формы
            dispatch(loginActions.setUsername(value));
        },
        [dispatch],
    );
    const onChangePassword = useCallback(
        (value: string) => {
            // деспатчим экшен изменения значения пароля стейта логин формы
            dispatch(loginActions.setPassword(value));
        },
        [dispatch],
    );

    // получаем стейт сторы
    const username = useSelector(getLoginUserName);
    const password = useSelector(getLoginPassword);
    const error = useSelector(getLoginError);
    const isLoading = useSelector(getLoginIsLoading);

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByUsername({ username, password }));
        if (result.meta.requestStatus === 'fulfilled') onSuccess?.();
    }, [dispatch, password, username, onSuccess]);
    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <div className={classNames(cls.LoginForm, {}, [className])}>
                <Text title={t('Форма авторизации')} />
                {error && (
                    <Text
                        text={t('Вы ввели неверный логин или пароль')}
                        theme={TextTheme.ERROR}
                    />
                )}
                <Input
                    autoFocus
                    placeholder={t('Введите логин')}
                    type="text"
                    className={cls.input}
                    onChange={onChangeUsername}
                    value={username}
                />
                <Input
                    placeholder={t('Введите пароль')}
                    type="text"
                    className={cls.input}
                    onChange={onChangePassword}
                    value={password}
                />
                <Button
                    theme={ButtonTheme.OUTLINE}
                    className={cls.loginBtn}
                    onClick={onLoginClick}
                    disabled={isLoading}
                >
                    {t('Войти')}
                </Button>
            </div>
        </DynamicModuleLoader>
    );
});

export default LoginForm;
