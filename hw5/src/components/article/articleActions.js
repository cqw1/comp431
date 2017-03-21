import { resource } from '../../actions.js'

/*
 * Actions associated with articles. Includes filtering
 * or creating a new article
 */
export const ArticleAction = {
    GET_ARTICLES: 'GET_ARTICLES',
    POST_ARTICLE: 'POST_ARTICLE',
    FILTER_ARTICLES: 'FILTER_ARTICLES',
}

export function getArticles() {
    var articles = [];

    return (dispatch) => {
        resource('GET', 'articles/')
        .then(r => {
            articles = r.articles;

            dispatch({
                type: ArticleAction.GET_ARTICLES,
                articles,
            })
        }).catch((err) => {
            console.log(err);
            /*
            valid = false;
            unauthorizedError = 'Username or password is invalid.';
            dispatch({
                type: AuthAction.LOGIN, 
                loginErrors: Object.assign({}, {
                    usernameError,
                    passwordError,
                    unauthorizedError,
                }),
                valid
            })
            */
        })
    }
}


export const postArticle = (text) => {
    if (text.length > 0) {
        var date = new Date();
        var month = date.getUTCMonth() + 1;
        var day = date.getUTCDay();
        var year = date.getUTCFullYear();

        return {
            type: ArticleAction.POST_ARTICLE,
            text: text,
            date: '' + month + '/' + day + '/' + year,
        }
    }

    return { type: 'ERROR' }
}

export const filterArticles = (filter) => {
    return {
        type: ArticleAction.FILTER_ARTICLES,
        filter: filter 
    }
}
