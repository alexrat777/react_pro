import { selectByTestId } from '../../helpers/selectByTestId';

describe('template spec', () => {
    describe('Пользователь НЕ авторизован', () => {
        it('Переход на главную страницу', () => {
            cy.visit('/');
            cy.get(selectByTestId('MainPage')).should('exist'); // проверяем наличие
        });
        it('Переход открывает страницу пользователя', () => {
            cy.visit('/profile/1');
            cy.get(selectByTestId('MainPage')).should('exist'); // проверяем наличие
        });
        it('Переход открывает не существующий маршрут', () => {
            cy.visit('/dfgdfgdfg');
            cy.get(selectByTestId('NotFoundPage')).should('exist'); // проверяем наличие
        });
    });
    describe('Пользователь авторизован', () => {
        beforeEach(() => {
            cy.login();
        });
        it('Переход открывает страницу пользователя', () => {
            cy.visit('/profile/1');
            cy.get(selectByTestId('ProfilePage')).should('exist'); // проверяем наличие
        });
        it('Переход открывает страницу пользователя', () => {
            cy.visit('/articles');
            cy.get(selectByTestId('ArticlesPage')).should('exist'); // проверяем наличие
        });
    });
});
