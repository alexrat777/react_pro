export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    PROFILE = 'profile',
    ARTICLES = 'articles',
    ARTCLE_DETAILS = 'article_details',
    ARTCLE_CREATE = 'article_create',
    ARTCLE_EDIT = 'article_edit',
    ADMIN_PANEL = 'admin_panel',
    FORBIDDEN = 'forbidden',
    // last
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.PROFILE]: '/profile/', // + :id
    [AppRoutes.ARTICLES]: '/articles',
    [AppRoutes.ARTCLE_DETAILS]: '/articles/', // + :id
    [AppRoutes.ARTCLE_CREATE]: '/articles/new',
    [AppRoutes.ARTCLE_EDIT]: '/articles/:id/edit', // + :id
    [AppRoutes.ADMIN_PANEL]: '/admin',
    [AppRoutes.FORBIDDEN]: '/forbidden',
    // роут должен быть последним
    [AppRoutes.NOT_FOUND]: '*',
};
