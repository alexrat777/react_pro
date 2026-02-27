export const updateProfile = (firstname: string, lastname: string) => {
    cy.getByTestId('EditableProfileCardHeader.EditButton').click();
    cy.getByTestId('ProfileCard.Firstname').clear().type(firstname); // очистить и ввести новые данные
    cy.getByTestId('ProfileCard.Lastname').clear().type(lastname);
    cy.getByTestId('EditableProfileCardHeader.SaveButton').click();
};
export const resetProfile = (profileId: string) => {
    return cy.request({
        method: 'PUT',
        url: `http://localhost:8000/profile/${profileId}`,
        headers: { Authorization: 'dfdf' },
        body: {
            id: '4',
            first: 'Test first',
            lastname: 'Test lastname',
            age: 25,
            currency: 'RUB',
            country: 'Russia',
            city: 'Samara',
            username: 'testuser',
            avatar: 'https://sectricity.com/wp-content/uploads/2023/05/Hacker-Cyber-Security-Internet-Sectricity.jpg',
        },
    });
};
declare global {
    namespace Cypress {
        interface Chainable {
            updateProfile(firstname: string, lastname: string): Chainable<void>;
            resetProfile(profileId: string): Chainable<void>;
        }
    }
}
