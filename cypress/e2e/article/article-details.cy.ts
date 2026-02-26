let currentArticleID = '';
describe('Пользователь заходит на страницу статьи', () => {
    beforeEach(() => {
        cy.login();

        cy.createArticle().then((article) => {
            currentArticleID = article.id;
            cy.visit(`articles/${article.id}`);
            cy.log(JSON.stringify(article));
        });
    });
    afterEach(() => {
        cy.removeArticle(currentArticleID);
    });
    it('И видит содержимое статьи', () => {
        cy.getByTestId('ArticleDetails.Info').should('exist');
    });
    it('И видит рекомендации', () => {
        cy.getByTestId('ArticleRecommendationsList').should('exist');
    });
    it('И оставляет комментарии', () => {
        cy.getByTestId('ArticleDetails.Info').should('exist');
        cy.getByTestId('AddCommentForm').scrollIntoView();
        cy.addComment('text comment');
        cy.getByTestId('CommentCard.Content').should('have.length', 1);
    });
    it('И ставит оценку', () => {
        cy.getByTestId('ArticleDetails.Info');
        cy.getByTestId('RatingCard').scrollIntoView();
        cy.setRate(5, 'feedback');
        cy.get('[data-selected=true').should('have.length', 5);
    });
    it('И ставит оценку(тест на стабах)', () => {
        cy.intercept('GET', '**/articles/*', { fixture: 'article-details.json' });
        cy.getByTestId('ArticleDetails.Info');
        cy.getByTestId('RatingCard').scrollIntoView();
        cy.setRate(5, 'feedback');
        cy.get('[data-selected=true').should('have.length', 5);
    });
});
