import { resource, nonJSONResource } from '../../actions.js'

import {AlertType, showAlert} from '../alert/alertActions.js'

/*
 * Actions associated with articles. Includes filtering
 * or creating a new article
 */
export const ArticleAction = {
    GET_ARTICLES: 'GET_ARTICLES',
    POST_ARTICLE: 'POST_ARTICLE',
    FILTER_ARTICLES: 'FILTER_ARTICLES',
    TOGGLE_COMMENTS: 'TOGGLE_COMMENTS',
    TOGGLE_EDIT_ARTICLE: 'TOGGLE_EDIT_ARTICLE',
    UPDATE_ARTICLE: 'UPDATE_ARTICLE',
    TOGGLE_COMMENTING: 'TOGGLE_COMMENTING',
    POST_COMMENT: 'POST_COMMENT',
    TOGGLE_EDIT_COMMENT: 'TOGGLE_EDIT_COMMENT',
    UPDATE_COMMENT: 'UPDATE_COMMENT',
}

export function updateArticle(id, text) {
    return (dispatch) => {
        resource('PUT', 'articles/' + id, {text})
        .then(r => {
            dispatch({
                type: ArticleAction.UPDATE_ARTICLE,
                article: r.articles[0],
            });
        }).catch((err) => {
            console.log(err);
            dispatch(showAlert(err.toString()), AlertType.ERROR);
        })
    }
}

export const editArticle = (id) => (dispatch) => {
    dispatch({
        type: ArticleAction.TOGGLE_EDIT_ARTICLE,
        articleId: id,
    })
}

export const toggleComments = (id) => (dispatch) => {
    dispatch({
        type: ArticleAction.TOGGLE_COMMENTS,
        articleId: id,
    })
}

export const toggleCommenting = (id) => (dispatch) => {
    dispatch({
        type: ArticleAction.TOGGLE_COMMENTING,
        articleId: id,
    })
}

export function checkEditArticle(id, articlesMeta) {
    const filtered = articlesMeta.filter(function(obj) {
        return obj._id == id;
    });
    
    if (filtered.length > 0) {
        return filtered[0].edit;
    }

    return false;
}

export function checkShowComments(id, articlesMeta) {
    const filtered = articlesMeta.filter(function(obj) {
        return obj._id == id;
    });
    
    if (filtered.length > 0) {
        return filtered[0].comments;
    }

    return false;
}

export function checkCommenting(id, articlesMeta) {
    const filtered = articlesMeta.filter(function(obj) {
        return obj._id == id;
    });
    
    if (filtered.length > 0) {
        return filtered[0].commenting;
    }

    return false;
}

export function getArticles() {
    let articles = [];

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
            dispatch(showAlert(err.toString()), AlertType.ERROR);
        })
    }
}

export const postArticle = (text, image) => {
    if (text.length > 0 || image) {
        return (dispatch) => {

            const fd = new FormData();
            fd.append('text', text);
            fd.append('image', image);
            console.log('fd');
            console.log(fd);

            nonJSONResource('POST', 'article/', fd)
            .then(r => {
                dispatch({
                    type: ArticleAction.POST_ARTICLE,
                    article: r.articles[0],
                })

                dispatch(showAlert('Posted article.', AlertType.SUCCESS));
            })

            /*
            resource('POST', 'article/', {text: text})
            .then(r => {
                dispatch({
                    type: ArticleAction.POST_ARTICLE,
                    article: r.articles[0],
                })

                dispatch(showAlert('Posted article.', AlertType.SUCCESS));
            })
            */
        }
    }
}

export const filterArticles = (filter) => {
    return {
        type: ArticleAction.FILTER_ARTICLES,
        filter: filter 
    }
}

export const postComment = (id, text) => {
    if (text.length > 0) {
        return (dispatch) => {

            resource('PUT', 'articles/' + id, {"commentId": -1, text})
            .then(r => {
                dispatch({
                    type: ArticleAction.POST_COMMENT,
                    article: r.articles[0],
                })

                dispatch(showAlert('Posted comment.', AlertType.SUCCESS));
            })
        }
    }
}

export const editComment = (id) => (dispatch) => {
    dispatch({
        type: ArticleAction.TOGGLE_EDIT_COMMENT,
        commentId: id,
    })
}

export function checkEditComment(id, commentsMeta) {
    const filtered = commentsMeta.filter(function(obj) {
        return obj.commentId == id;
    });
    
    if (filtered.length > 0) {
        return filtered[0].edit;
    }

    return false;
}

export function updateComment(articleId, commentId, text) {
    return (dispatch) => {
        resource('PUT', 'articles/' + articleId, {text, commentId})
        .then(r => {
            dispatch({
                type: ArticleAction.UPDATE_COMMENT,
                article: r.articles[0],
                commentId,
            });
        }).catch((err) => {
            console.log(err);
            dispatch(showAlert(err.toString()), AlertType.ERROR);
        })
    }
}


