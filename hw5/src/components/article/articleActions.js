import { resource } from '../../actions.js'

/*
 * Actions associated with articles. Includes filtering
 * or creating a new article
 */
export const ArticleAction = {
    GET_ARTICLES: 'GET_ARTICLES',
    POST_ARTICLE: 'POST_ARTICLE',
    FILTER_ARTICLES: 'FILTER_ARTICLES',
    TOGGLE_COMMENTS: 'TOGGLE_COMMENTS',
}

export const toggleComments = (id) => (dispatch) => {
    dispatch({
        type: ArticleAction.TOGGLE_COMMENTS,
        articleId: id,
    })
}

export function checkShowComments(id, showComments) {
    return showComments.filter(function(obj) {
        return obj.id == id;
    })[0].show;
    
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
        return (dispatch) => {
            resource('POST', 'article/', {text})
            .then(r => {
                dispatch({
                    type: ArticleAction.POST_ARTICLE,
                    article: r.articles[0],
                })
            })
        }
    }
}

export const filterArticles = (filter) => {
    return {
        type: ArticleAction.FILTER_ARTICLES,
        filter: filter 
    }
}
