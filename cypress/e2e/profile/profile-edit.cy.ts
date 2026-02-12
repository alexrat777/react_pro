let profileId = '';
describe('Пользователь заходит на страницу профиля', () => {
    beforeEach(() => {
        cy.visit('');
        cy.login().then((data) => {
            profileId = data.id;
            cy.visit(`profile/${data.id}`);
        });
    });
    afterEach(() => {
        cy.resetProfile(profileId);
    });
    it('Профиль успешно загружается', () => {
        cy.getByTestId('ProfileCard.Firstname').should('have.value', 'Test first');
    });
    it('Редактирует его', () => {
        const newFirstname = 'New Name';
        const newLastname = 'New Lastname';
        cy.updateProfile(newFirstname, newLastname);
        cy.getByTestId('ProfileCard.Firstname').should('have.value', newFirstname); // очистить и ввести новые данные
        cy.getByTestId('ProfileCard.Lastname').should('have.value', newLastname);
    });
});
