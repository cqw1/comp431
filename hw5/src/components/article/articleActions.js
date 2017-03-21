import { resource } from '../../actions.js'

/*
 * Actions associated with articles. Includes filtering
 * or creating a new article
 */
export const ArticleAction = {
    POST_ARTICLE: 'POST_ARTICLE',
    FILTER_ARTICLES: 'FILTER_ARTICLES',
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
