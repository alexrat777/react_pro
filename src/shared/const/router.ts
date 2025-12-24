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

export const getRouteMain = () => '/';
export const getRouteAbout = () => '/about';
export const getRouteProfile = (id:string) => `/profile/${id}`;
export const getRouteArticles = () => '/articles';
export const getRouteArticleDetails = (id:string) => `/articles/${id}`;
export const getRouteArticleCreate = () => '/articles/new';
export const getRouteArticleEdit = (id:string) => `/articles/${id}/edit`;
export const getRouteAdmin = () => '/admin';
export const getRouteForbidden = () => '/forbidden';
// поменяли на функции генерирующие адреса маршрутов
// export const RoutePath: Record<AppRoutes, string> = {
//     [AppRoutes.MAIN]: getRouteMain(),
//     [AppRoutes.ABOUT]: getRouteAbout(),
//     [AppRoutes.PROFILE]: getRouteProfile(':id'),
//     [AppRoutes.ARTICLES]: getRouteArticles(),
//     [AppRoutes.ARTCLE_DETAILS]: getRouteArticleDetails(':id'),
//     [AppRoutes.ARTCLE_CREATE]: getRouteArticleCreate(),
//     [AppRoutes.ARTCLE_EDIT]: getRouteArticleEdit(':id'),
//     [AppRoutes.ADMIN_PANEL]: getRouteAdmin(),
//     [AppRoutes.FORBIDDEN]: getRouteForbidden(),
//     // роут должен быть последним
//     [AppRoutes.NOT_FOUND]: '*',
// };
