import { screen } from '@testing-library/react';
import { AppRouter } from './AppRouter';
import { ComponentRender } from '@/shared/lib/helpers/tests/componentRender/componentRender';
import {
    getRouteAbout,
    getRouteAdmin,
    getRouteProfile,
} from '@/shared/const/router';
import { UserRole } from '@/entities/User';

describe('app/router/AppRouter', () => {
    test('Страница должна отрендериться', async () => {
        ComponentRender(<AppRouter />, {
            route: getRouteAbout(),
        });

        const page = await screen.findByTestId('AboutPage'); // поиск элемента по TestId асинхронно
        expect(page).toBeInTheDocument(); // проверка что есть на странице
    });
    test('Страница не найдена', async () => {
        ComponentRender(<AppRouter />, {
            route: '/dkjfhdskljfsd',
        });

        const page = await screen.findByTestId('NotFoundPage'); // поиск элемента по TestId асинхронно
        expect(page).toBeInTheDocument(); // проверка что есть на странице
    });
    test('Редирект не авторизованного пользователя', async () => {
        ComponentRender(<AppRouter />, {
            route: getRouteProfile('1'),
        });

        const page = await screen.findByTestId('MainPage'); // поиск элемента по TestId асинхронно
        expect(page).toBeInTheDocument(); // проверка что есть на странице
    });
    test('Зарегистрированный пользователь', async () => {
        ComponentRender(<AppRouter />, {
            route: getRouteProfile('1'),
            initialState: {
                user: { _inited: true, authData: { id: '1' } },
            },
        });

        const page = await screen.findByTestId('ProfilePage'); // поиск элемента по TestId асинхронно
        expect(page).toBeInTheDocument(); // проверка что есть на странице
    });
    test('Доступ запрещен (отсутствует роль)', async () => {
        ComponentRender(<AppRouter />, {
            route: getRouteAdmin(),
            initialState: {
                user: { _inited: true, authData: {} },
            },
        });

        const page = await screen.findByTestId('ForbiddenPage'); // поиск элемента по TestId асинхронно
        expect(page).toBeInTheDocument(); // проверка что есть на странице
    });
    test('Доступ разрешен (присутствует роль)', async () => {
        ComponentRender(<AppRouter />, {
            route: getRouteAdmin(),
            initialState: {
                user: { _inited: true, authData: { role: [UserRole.ADMIN] } },
            },
        });

        const page = await screen.findByTestId('AdminPanelPage'); // поиск элемента по TestId асинхронно
        expect(page).toBeInTheDocument(); // проверка что есть на странице
    });
});
